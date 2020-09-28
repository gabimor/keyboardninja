import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FacebookAuthGuard extends AuthGuard("facebook") {
  // canActivate() {
  //   console.log("can activate");
  //   return true;
  // }
}
