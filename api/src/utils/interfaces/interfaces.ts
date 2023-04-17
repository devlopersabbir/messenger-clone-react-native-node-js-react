import { Status } from "../enums/enum";

export interface IUser {
  id?: number;
  uuid: string;
  username: string;
  name?: string;
  email?: string;
  image?: string;
  status?: Status.OFFLINE;
}
