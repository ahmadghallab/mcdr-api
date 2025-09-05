import { SetMetadata } from '@nestjs/common';
import { AdminRole } from 'src/core/common/enums/admin-role.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);

export const AllRoles = () => Roles(
  AdminRole.Owner,
  AdminRole.Admin,
  AdminRole.Manager,
  AdminRole.Editor,
  AdminRole.Moderator,
  AdminRole.Viewer,
);