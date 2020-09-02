import { CanActivate } from "@nestjs/common";

export const mock_localAuthGuard: CanActivate = {
  canActivate: jest.fn(() => {
    return true;
  }),
};
