export type Shortcut = {
  _id: string;
  action: string;
  sectionId: string;
  pins: number;
  win?: string;
  mac?: string;
  isHtml?: boolean;
  isPinned?: boolean;
  note?: string;
};
