import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {UseRoleGuard} from "./use-role.guard";
import * as process from "process";

it('should be defined', () => {
  const reflector = new Reflector();
  const jwtService = new JwtService({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  });
  expect(new UseRoleGuard(reflector, jwtService)).toBeDefined();
});