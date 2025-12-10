/**
 * IMPORTS
 */
import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

// roles / services
import { CrateRolesService } from '@src/domain/use-cases/roles/create-roles.service';
import { GeAllRolesService } from '@src/domain/use-cases/roles/get-all-roles.service';
import { GetOneRoleByIdService } from '@src/domain/use-cases/roles/get-one-roles.service';
import { UpdateRolesService } from '@src/domain/use-cases/roles/upadte-roles.service';
import { DeleteOneRoleByService } from '@src/domain/use-cases/roles/delete-roles.service';

// roles / controllers
import { CreateRolesController } from './controllers/roles/create-roles.controller';
import { GetAllRolesController } from './controllers/roles/get-all-roles.controller';
import { GetOneRolesController } from './controllers/roles/get-one-role.controller';
import { UpdateRolesController } from './controllers/roles/update-roles.controller';
import { DeleteOneRolesController } from './controllers/roles/delete-roles.controller';

// users / controllers
import { CreateUsersController } from '@src/infra/http/controllers/users/create-users.controller';
import { GetAllUsersController } from './controllers/users/get-all-users.controller';
import { GetOneUsersController } from './controllers/users/get-one-users.controller';
import { UpdateUsersController } from './controllers/users/update-users.controller';
import { DeleteOneUsersController } from './controllers/users/delete-one-users.controller';

// users / services
import { CreateUserservice } from '@src/domain/use-cases/users/create-users.service';
import { GetAllUsersService } from '@src/domain/use-cases/users/get-all-users.service';
import { GetOneUsersService } from '@src/domain/use-cases/users/get-one-users.service';
import { UpdateUsersService } from '@src/domain/use-cases/users/update-users.service';
import { DeleteOneUsersByService } from '@src/domain/use-cases/users/delete-one-users.service';

// shared / utils
import { BcryptHasher } from '@src/core/shared/utils/cryptograpy';

@Module({
  controllers: [
    //regras
    CreateRolesController,
    GetAllRolesController,
    GetOneRolesController,
    UpdateRolesController,
    DeleteOneRolesController,

    // usuários
    CreateUsersController,
    GetAllUsersController,
    GetOneUsersController,
    UpdateUsersController,
    DeleteOneUsersController,
  ],
  providers: [
    PrismaService,
    BcryptHasher,

    // regras
    CrateRolesService,
    GeAllRolesService,
    GetOneRoleByIdService,
    UpdateRolesService,
    DeleteOneRoleByService,

    // usuários
    CreateUserservice,
    GetAllUsersService,
    GetOneUsersService,
    UpdateUsersService,
    DeleteOneUsersByService,
  ],
})
export class HttpModule {}
