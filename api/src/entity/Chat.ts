import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import Modal from "./Modal/Modal";
import { User } from "./User";
import { Messages } from "./Message";
import { Call } from "./Call";

@Entity("Chat")
export class Chat extends Modal {
  @Column({ nullable: true })
  name?: string;

  @Column({ default: "gray.100" })
  chatBackgroundColor: string;

  @Column({ nullable: true })
  myTextColor: string;

  @Column({ nullable: true })
  partnerTextColor: string;

  @Column({ nullable: true, default: "New contact..." })
  lastMessage?: string;

  @ManyToMany(() => User, (user) => user.chats, { cascade: true })
  users: User[];

  @ManyToMany(() => Messages, (message) => message.chat)
  messages: Messages[];

  // for the chat
  // @OneToMany(() => Call, (call) => call.chat)
  // incomingCalls: Call[];

  // @OneToMany(() => Call, (call) => call.chat)
  // outgoingCalls: Call[];
}
// const chat = await chatRepository.findOne({ where: { id: chatId }, relations: ["incomingCalls"] });
// const incomingCalls = chat.incomingCalls;

// const message = await messageRepository.findOne({ where: { id: messageId }, relations: ["outgoingCalls"] });
// const outgoingCalls = message.outgoingCalls;
