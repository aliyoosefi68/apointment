import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import {
  CheckOtpDto,
  ForgetPasswordDto,
  LoginDto,
  RefreshTokenDto,
  SendOtpDto,
  SignupDto,
} from "./dto/auth.dto";
import { mobileValidation } from "src/common/utils/mobile.util";
import { randomPassword } from "src/common/utils/password.util";
import { isMobilePhone } from "class-validator";
import { compareSync } from "bcrypt";
import { A_JWT_SECRET, R_JWT_SECRET } from "src/common/constant/jwt.const";
import { randomInt } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto) {
    const { firstname, lastname, mobile } = signupDto;
    const { phoneNumber } = mobileValidation(mobile);
    let user = await this.userRepository.findOneBy({ mobile: phoneNumber });
    if (user)
      throw new ConflictException(
        "شماره موبایل وارد شده قبلا توسط شخص دیگری استفاده شده"
      );
    let { password, hashed } = randomPassword(8);
    await this.userRepository.insert({
      firstname,
      lastname,
      mobile: phoneNumber,
      password: hashed,
    });
    return {
      message:
        "حساب کاربری شما با موفقیت ایجاد شده، در بخش ورود وارد حساب کاربری خود شوید",
      password,
    };
  }

  async login(loginDto: LoginDto) {
    const { password, username } = loginDto;
    let user = await this.userRepository.findOneBy({ username });
    if (!user && isMobilePhone(username, "fa-IR"))
      user = await this.userRepository.findOneBy({ mobile: username });
    if (!user)
      throw new UnauthorizedException("نام کاربری یا رمز عبور اشتباه میباشد");
    if (compareSync(password, user.password)) {
      return this.tokenGenerator(user.id);
    }
    throw new UnauthorizedException("نام کاربری یا رمز عبور اشتباه میباشد");
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { mobile } = sendOtpDto;
    const { phoneNumber } = mobileValidation(mobile);
    let user = await this.userRepository.findOneBy({ mobile: phoneNumber });
    if (!user) throw new NotFoundException("حساب کاربری یافت نشد");
    if (user.otp_expires_in >= new Date()) {
      throw new BadRequestException("کد قبلی هنوز منقضی نشده است");
    }
    const otpCode = randomInt(10000, 99999);
    user.otp_code = String(otpCode);
    user.otp_expires_in = new Date(new Date().getTime() + 1000 * 60);
    await this.userRepository.save(user);
    return {
      message: "رمز یکبار مصرف برای شما ارسال شد",
      code: otpCode,
    };
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const { mobile, code } = checkOtpDto;
    const { phoneNumber } = mobileValidation(mobile);
    let user = await this.userRepository.findOneBy({ mobile: phoneNumber });
    if (!user) throw new NotFoundException("حساب کاربری یافت نشد");
    if (user.otp_expires_in < new Date())
      throw new UnauthorizedException("کد ارسال شده منقضی شده است");
    if (code === user.otp_code) {
      return this.tokenGenerator(user.id);
    }
    throw new UnauthorizedException("کد ارسال شده صحیح نمییاشد");
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {}

  //
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    const userId = this.verifyRefreshToken(refreshToken);
    if (userId) return this.tokenGenerator(+userId);
    throw new UnauthorizedException("مجددا وارد حساب کاربری خود شوید");
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const verified = this.jwtService.verify(refreshToken, {
        secret: R_JWT_SECRET,
      });
      if (verified?.userId && !isNaN(parseInt(verified.userId)))
        return verified?.userId;
      throw new UnauthorizedException("وارد حساب کاربری خود شوید");
    } catch (err) {
      throw new UnauthorizedException("مجددا وارد حساب کاربری خود شوید");
    }
  }

  async tokenGenerator(userId: number) {
    const accessToken = this.jwtService.sign(
      { userId },
      { secret: A_JWT_SECRET, expiresIn: "1d" }
    );
    const refreshToken = this.jwtService.sign(
      { userId },
      { secret: R_JWT_SECRET, expiresIn: "30d" }
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
