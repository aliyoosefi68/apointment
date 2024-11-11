import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup() {}
  @Post("login")
  login() {}
  @Post("send-otp")
  sendOtp() {}
  @Post("check-otp")
  chechOtp() {}
  @Post("forget-password")
  forgetPassword() {}
  @Post("signup")
  refreshToken() {}
}
