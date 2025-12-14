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
import { GetMeController } from './controllers/users/me-users.controller';
import { UpdateUsersController } from './controllers/users/update-users.controller';
import { DeleteOneUsersController } from './controllers/users/delete-one-users.controller';

// users / services
import { CreateUserservice } from '@src/domain/use-cases/users/create-users.service';
import { GetAllUsersService } from '@src/domain/use-cases/users/get-all-users.service';
import { GetOneUsersService } from '@src/domain/use-cases/users/get-one-users.service';
import { GetMeUsersService } from '@src/domain/use-cases/users/me-users.services';
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

// requests / services
import { CreateRequestsService } from '@src/domain/use-cases/requests/create-requests.service';
import { GetAllRequestsService } from '@src/domain/use-cases/requests/get-all-requests.service';
import { GetOneRequestsService } from '@src/domain/use-cases/requests/get-one-requests.service';
import { UpdateRequestsService } from '@src/domain/use-cases/requests/update-requests.service';
import { DeleteRequestsService } from '@src/domain/use-cases/requests/delete-requests.service';

// requests / controllers
import { CreateRequestsController } from './controllers/requests/create-requests.controller';
import { GetAllRequestsController } from './controllers/requests/get-all-requests.controller';
import { GetOneRequestsController } from './controllers/requests/get-one-requests.controller';
import { UpdateRequestsController } from './controllers/requests/update-requests.controller';
import { DeleteRequestsController } from './controllers/requests/delete-requests.controller';

// users-system-settings / services
import { CreateUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/create-users-system-settings.service';
import { GetAllUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/get-all-users-system-settings.service';
import { GetOneUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/get-one-users-system-settings.service';
import { UpdateUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/update-users-system-settings.service';
import { DeleteUsersSystemSettingsService } from '@src/domain/use-cases/users-system-settings/delete-users-system-settings.service';

// users-system-settings / controllers
import { CreateUsersSystemSettingsController } from './controllers/users-system-settings/create-users-system-settings.controller';
import { GetAllUsersSystemSettingsController } from './controllers/users-system-settings/get-all-users-system-settings.controller';
import { GetOneUsersSystemSettingsController } from './controllers/users-system-settings/get-one-users-system-settings.controller';
import { UpdateUsersSystemSettingsController } from './controllers/users-system-settings/update-users-system-settings.controller';
import { DeleteUsersSystemSettingsController } from './controllers/users-system-settings/delete-users-system-settings.controller';

// authorized-devices / services
import { CreateAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/create-authorized-devices.service';
import { GetAllAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/get-all-authorized-devices.service';
import { GetOneAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/get-one-authorized-devices.service';
import { UpdateAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/update-authorized-devices.service';
import { DeleteAuthorizedDevicesService } from '@src/domain/use-cases/authorized-devices/delete-authorized-devices.service';

// authorized-devices / controllers
import { CreateAuthorizedDevicesController } from './controllers/authorized-devices/create-authorized-devices.controller';
import { GetAllAuthorizedDevicesController } from './controllers/authorized-devices/get-all-authorized-devices.controller';
import { GetOneAuthorizedDevicesController } from './controllers/authorized-devices/get-one-authorized-devices.controller';
import { UpdateAuthorizedDevicesController } from './controllers/authorized-devices/update-authorized-devices.controller';
import { DeleteAuthorizedDevicesController } from './controllers/authorized-devices/delete-authorized-devices.controller';

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
    GetMeController,
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

    // solicitacoes
    CreateRequestsController,
    GetAllRequestsController,
    GetOneRequestsController,
    UpdateRequestsController,
    DeleteRequestsController,

    // users-system-settings
    CreateUsersSystemSettingsController,
    GetAllUsersSystemSettingsController,
    GetOneUsersSystemSettingsController,
    UpdateUsersSystemSettingsController,
    DeleteUsersSystemSettingsController,

    // authorized-devices
    CreateAuthorizedDevicesController,
    GetAllAuthorizedDevicesController,
    GetOneAuthorizedDevicesController,
    UpdateAuthorizedDevicesController,
    DeleteAuthorizedDevicesController,
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
    GetMeUsersService,
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

    // solicitacoes
    CreateRequestsService,
    GetAllRequestsService,
    GetOneRequestsService,
    UpdateRequestsService,
    DeleteRequestsService,

    // users-system-settings
    CreateUsersSystemSettingsService,
    GetAllUsersSystemSettingsService,
    GetOneUsersSystemSettingsService,
    UpdateUsersSystemSettingsService,
    DeleteUsersSystemSettingsService,

    // authorized-devices
    CreateAuthorizedDevicesService,
    GetAllAuthorizedDevicesService,
    GetOneAuthorizedDevicesService,
    UpdateAuthorizedDevicesService,
    DeleteAuthorizedDevicesService,
  ],
})
export class HttpModule {}
