export type TFooterItem = {
  id?: number;
  name: string;
  iconName: any;
};

export type TMessage = {
  id?: number;
  uuid?: string;
  avater?: string;
  name: string;
  message?: string;
  lastSeen?: string;
  status?: string;
  unseenMessage?: number;
};
