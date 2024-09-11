import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // Continuar usando la estrategia de autenticación predeterminada
        const isValid = super.canActivate(context);
        if (!isValid) {
            throw new UnauthorizedException();
        }

        // Obtener los roles requeridos de los metadatos de la ruta
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si no se requieren roles, permitir el acceso
        if (!requiredRoles) {
            return true;
        }

        // Obtener el usuario y sus roles
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user)

        // Verificar si el usuario tiene alguno de los roles requeridos
        const hasRole = () => requiredRoles.some((role) => user.roles?.includes(role));

        // Si el usuario no tiene ninguno de los roles requeridos, lanzar una excepción
        if (!user || !hasRole()) {
            throw new UnauthorizedException();
        }

        // Si el usuario tiene alguno de los roles requeridos, permitir el acceso
        return true;
    }
}