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

// companies / services
import { CreateCompaniesService } from '@src/domain/use-cases/companies/create-companies.service';
import { GetAllCompaniesService } from '@src/domain/use-cases/companies/get-all-companies.service';
import { GetOneCompaniesService } from '@src/domain/use-cases/companies/get-one-companies.service';
import { UpdateCompaniesService } from '@src/domain/use-cases/companies/update-companies.service';
import { DeleteCompaniesService } from '@src/domain/use-cases/companies/delete-companies.service';

// companies / controllers
import { CreateCompaniesController } from './controllers/companies/create-companies.controller';
import { GetAllCompaniesController } from './controllers/companies/get-all-companies.controller';
import { GetOneCompaniesController } from './controllers/companies/get-one-companies.controller';
import { UpdateCompaniesController } from './controllers/companies/update-companies.controller';
import { DeleteCompaniesController } from './controllers/companies/delete-companies.controller';

// company-rules / services
import { CreateCompanyRulesService } from '@src/domain/use-cases/company-rules/create-company-rules.service';
import { GetAllCompanyRulesService } from '@src/domain/use-cases/company-rules/get-all-company-rules.service';
import { GetOneCompanyRulesService } from '@src/domain/use-cases/company-rules/get-one-company-rules.service';
import { UpdateCompanyRulesService } from '@src/domain/use-cases/company-rules/update-company-rules.service';
import { DeleteCompanyRulesService } from '@src/domain/use-cases/company-rules/delete-company-rules.service';

// company-rules / controllers
import { CreateCompanyRulesController } from './controllers/company-rules/create-company-rules.controller';
import { GetAllCompanyRulesController } from './controllers/company-rules/get-all-company-rules.controller';
import { GetOneCompanyRulesController } from './controllers/company-rules/get-one-company-rules.controller';
import { UpdateCompanyRulesController } from './controllers/company-rules/update-company-rules.controller';
import { DeleteCompanyRulesController } from './controllers/company-rules/delete-company-rules.controller';

// point-markings / services
import { CreatePointMarkingsService } from '@src/domain/use-cases/point-markings/create-point-markings.service';
import { GetAllPointMarkingsService } from '@src/domain/use-cases/point-markings/get-all-point-markings.service';
import { GetOnePointMarkingsService } from '@src/domain/use-cases/point-markings/get-one-point-markings.service';
import { UpdatePointMarkingsService } from '@src/domain/use-cases/point-markings/update-point-markings.service';
import { DeletePointMarkingsService } from '@src/domain/use-cases/point-markings/delete-point-markings.service';

// point-markings / controllers
import { CreatePointMarkingsController } from './controllers/point-markings/create-point-markings.controller';
import { GetAllPointMarkingsController } from './controllers/point-markings/get-all-point-markings.controller';
import { GetOnePointMarkingsController } from './controllers/point-markings/get-one-point-markings.controller';
import { UpdatePointMarkingsController } from './controllers/point-markings/update-point-markings.controller';
import { DeletePointMarkingsController } from './controllers/point-markings/delete-point-markings.controller';

// journeys / services
import { CreateJourneysService } from '@src/domain/use-cases/journeys/create-journeys.service';
import { GetAllJourneysService } from '@src/domain/use-cases/journeys/get-all-journeys.service';
import { GetOneJourneysService } from '@src/domain/use-cases/journeys/get-one-journeys.service';
import { UpdateJourneysService } from '@src/domain/use-cases/journeys/update-journeys.service';
import { DeleteJourneysService } from '@src/domain/use-cases/journeys/delete-journeys.service';

// journeys / controllers
import { CreateJourneysController } from './controllers/journeys/create-journeys.controller';
import { GetAllJourneysController } from './controllers/journeys/get-all-journeys.controller';
import { GetOneJourneysController } from './controllers/journeys/get-one-journeys.controller';
import { UpdateJourneysController } from './controllers/journeys/update-journeys.controller';
import { DeleteJourneysController } from './controllers/journeys/delete-journeys.controller';

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

    // empresas
    CreateCompaniesController,
    GetAllCompaniesController,
    GetOneCompaniesController,
    UpdateCompaniesController,
    DeleteCompaniesController,

    // regras de empresas
    CreateCompanyRulesController,
    GetAllCompanyRulesController,
    GetOneCompanyRulesController,
    UpdateCompanyRulesController,
    DeleteCompanyRulesController,

    // pontos de marcação
    CreatePointMarkingsController,
    GetAllPointMarkingsController,
    GetOnePointMarkingsController,
    UpdatePointMarkingsController,
    DeletePointMarkingsController,

    // jornadas
    CreateJourneysController,
    GetAllJourneysController,
    GetOneJourneysController,
    UpdateJourneysController,
    DeleteJourneysController,
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

    // empresas
    CreateCompaniesService,
    GetAllCompaniesService,
    GetOneCompaniesService,
    UpdateCompaniesService,
    DeleteCompaniesService,

    // regras de empresas
    CreateCompanyRulesService,
    GetAllCompanyRulesService,
    GetOneCompanyRulesService,
    UpdateCompanyRulesService,
    DeleteCompanyRulesService,

    // pontos de marcação
    CreatePointMarkingsService,
    GetAllPointMarkingsService,
    GetOnePointMarkingsService,
    UpdatePointMarkingsService,
    DeletePointMarkingsService,

    // jornadas
    CreateJourneysService,
    GetAllJourneysService,
    GetOneJourneysService,
    UpdateJourneysService,
    DeleteJourneysService,
  ],
})
export class HttpModule {}
