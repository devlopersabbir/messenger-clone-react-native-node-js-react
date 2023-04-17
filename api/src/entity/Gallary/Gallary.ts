import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Model from "../Modal/Modal";
import { User } from "../User";
@Entity("Gallary")
export class Gallary extends Model {
  @Column()
  images: string;

  @ManyToOne(() => User, (user) => user.gallarys)
  @JoinColumn({ name: "user_uuid" })
  users: User;
}
