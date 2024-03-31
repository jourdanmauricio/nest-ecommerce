import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/roles.models';

export const ROLES_KEY = 'roles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
