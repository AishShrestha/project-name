import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles || roles.length === 0) {
            return true; // No specific roles required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const userRoles = request.user.roles; // Assuming roles are stored in request.user.roles

        // Check if user has at least one required role
        const allowed = roles.some(role => userRoles.includes(role));

        return allowed;
    }
}
