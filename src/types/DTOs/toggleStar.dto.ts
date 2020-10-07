import { IsNotEmpty } from "class-validator";
export class ToggleStarDto {
  @IsNotEmpty()
  appId: string;

  @IsNotEmpty()
  shortcutId: string;
}
