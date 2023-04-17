import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import Modal from "./Modal/Modal";
import { Status } from "../utils/enums/enum";
import { Chat } from "./Chat";
import { Messages } from "./Message";
import { Call } from "./Call";
import { Gallary } from "./Gallary/Gallary";

@Entity("Users")
export class User extends Modal {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: "enum", enum: Status, default: Status.OFFLINE })
  status?: string;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({
    name: "chat_and_user",
    joinColumn: {
      name: "user_uuid",
      referencedColumnName: "uuid",
    },
    inverseJoinColumn: {
      name: "chat_uuid",
      referencedColumnName: "uuid",
    },
  })
  chats: Chat[];

  @OneToMany(() => Messages, (message) => message.user)
  messages: Messages[];

  @OneToMany(() => Gallary, (gallary) => gallary.users)
  gallarys: Gallary[];
  //for chat

  // incoming calls associated with chats
  // @OneToMany(() => Chat, (chat) => chat.incomingCalls)
  // incomingCalls: Chat[];

  // // outgoing calls associated with chats
  // @OneToMany(() => Chat, (chat) => chat.outgoingCalls)
  // outgoingCalls: Chat[];

  // // incoming calls associated with messages
  // @OneToMany(() => Messages, (message) => message.incomingCalls)
  // incomingMessageCalls: Messages[];

  // // outgoing calls associated with messages
  // @OneToMany(() => Messages, (message) => message.outgoingCalls)
  // outgoingMessageCalls: Messages[];
}
