import { ClinicEntity } from "src/modules/clinic/entity/clinick.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  title: string;
  @Column()
  slug: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  imageKey: string;
  @Column()
  show: boolean;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: "CASCADE",
  })
  parent: CategoryEntity;
  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];

  @OneToMany(() => ClinicEntity, (clinic) => clinic.category)
  clinics: ClinicEntity[];
}
