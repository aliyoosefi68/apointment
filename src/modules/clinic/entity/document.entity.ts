import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clinic_document")
export class ClinicDocumentEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  license: string;
  @Column({ nullable: true })
  rent_agreement: string;
  @Column({ nullable: true })
  front_image: string;
  @Column({ nullable: true })
  side_image: string;
  @Column({ nullable: true })
  clinic_image_1: string;
  @Column({ nullable: true })
  clinic_image_2: string;
}
