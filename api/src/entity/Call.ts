import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./Modal/Modal";
import { CallType } from "../utils/enums/enum";
import { Chat } from "./Chat";

@Entity("Calls")
export class Call extends Model {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  partnerUuid: string;

  @Column({ nullable: false })
  callerUuid: string;

  @Column({ type: "enum", enum: CallType })
  callType: string;

  @Column({ nullable: true })
  outGoingCallTime: Date;

  @Column({ nullable: true })
  callDuration: string;
}
