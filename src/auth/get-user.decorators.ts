/* eslint-disable prettier/prettier */
import { User } from "./user.entity";
import { ExecutionContext,createParamDecorator } from "@nestjs/common";


export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)