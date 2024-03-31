import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      // OBTENDREMOS EL TOKEN LOS HEADERS COMO 'Bearer token'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // IGNORA LA EXPIRACION, EN TU CASO EL TIEMPO QUE LE HAYAS PUESTO
      // EJE.  signOptions: { expiresIn: '24h' }, YO LE PUSE 1 DIA
      ignoreExpiration: false,
      // LA LLAVE SECRETA CON LA QUE FIRMAMOS EL TOKEN AL HACER LOGIN
      secretOrKey: configService.jwtSecret,
    });
  }

  // ESTA FUNCION LO QUE HARA SERA RECIBIR EL TOKEN DECODIFICADO
  // CON LA CARGA DE DATOS QUE LE PUSIMOS AL HACER LOGIN
  async validate(payload: PayloadToken) {
    return payload;
  }
}
