import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Modal from "./Modal/Modal";
import { User } from "./User";
import { Chat } from "./Chat";
import { Call } from "./Call";

@Entity("Messages")
export class Messages extends Modal {
  @Column()
  text: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  userUuid?: string;

  @Column()
  chatUuid?: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: "user_uuid" })
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: "chat_uuid" })
  chat: Chat;

  // for chat
  // @OneToMany(() => Call, (call) => call.message)
  // incomingCalls: Call[];

  // @OneToMany(() => Call, (call) => call.message)
  // outgoingCalls: Call[];
}
