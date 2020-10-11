export type ToggleStarReturnType = Promise<{
  stars: number;
  isStarred: boolean;
}>;

export type HTMLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;
