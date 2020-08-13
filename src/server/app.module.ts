import { Module } from "@nestjs/common"
import { ApiModule } from "./api/api.module"
import { WebModule } from './web/web.module';

@Module({
  imports: [ApiModule, WebModule],
})
export class AppModule {}
