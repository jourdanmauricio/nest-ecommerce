import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
// importamos al reflector, que nos brinda esta metadata
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// nos traemos a la key de los roles
import { ROLES_KEY } from '../decorators/roles.decorator';
// nos traemos los modelos de los roles
import { Role } from '../models/roles.models';
// nos traemos al modelo de autenticación de usuario
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtenemos los roles de la metadata, nos los dsrán como un arrar de roles
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());
    // preguntamos si en la metadata recibimos algún rol, si no hay roles

    if (!roles) {
      // lo dejamos pasar sin más
      return true;
    }
    // obtenemos el Request paraver el role que posee el user
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role);
    // si el usuario no tiene autorización
    if (!isAuth) {
      // retornamos un error de no autorizado
      throw new ForbiddenException('Unauthorized');
    }
    // tiene permisos continúa
    return isAuth;
  }
}
