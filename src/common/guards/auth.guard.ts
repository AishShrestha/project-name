import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


function validateRequest(request): boolean {
    // Check if the request has an Authorization header
    const authHeader = request.headers['authorization'];

    // Simple check to see if the Authorization header is present and not empty
    if (authHeader) {
        // Add more complex validation logic here if needed (e.g., token verification)
        return true;
    }

    // If the Authorization header is missing or invalid, return false
    return false;
}


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}