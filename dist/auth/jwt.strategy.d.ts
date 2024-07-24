import { UserRepository } from "./user.repository";
import { Strategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    constructor(usersRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
