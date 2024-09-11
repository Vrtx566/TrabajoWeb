import {JwtService} from '@nestjs/jwt';
import {CanActivate, ExecutionContext, Injectable, Logger} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "../enums/role.enum";
import {ROLES_KEY} from "../auth/decorators/roles.decorator";
import {JwtStrategy} from "../auth/strategy/jwt.strategy";

@Injectable()
export class UseRoleGuard implements CanActivate {
    private readonly logger = new Logger(UseRoleGuard.name);

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private jwtStrategy: JwtStrategy // Inject JwtStrategy
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // No roles required for the route
        }

        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            this.logger.warn('Authorization header missing');
            return false; // No token provided
        }

        const jwt = authorizationHeader.split(' ')[1];

        try {
            // Validate the JWT using JwtStrategy
            const user = await this.jwtStrategy.validate(this.jwtService.decode(jwt));

            const {roles} = user;

            const userHasRole = requiredRoles.some((role) => roles?.includes(role));

            if (!userHasRole) {
                this.logger.debug(`Unauthorized access. User roles: ${roles}`);
                return false;
            }

            return true;
        } catch (err) {
            this.logger.error(`JWT verification failed: ${err.message}`);
            return false; // Token invalid or expired
        }
    }
}