/**
 * IMPORTS
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type IResponseSub = {
  sub: number;
  email: string;
  iat: number; // tempo de validade
  exp: number; // tempo de expiração
};
const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IResponseSub;
  },
);

/**
 * EXPORTS
 */
export { CurrentUser };
