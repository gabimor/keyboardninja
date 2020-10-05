export type Shortcut = {
  _id: string;
  action: string;
  sectionId: string;
  stars: number;
  win?: string;
  mac?: string;
  isHtml?: boolean;
  isStarred?: boolean;
  note?: string;
};
