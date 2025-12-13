/**
 * IMPORTS
 */
import { seedRoles } from './roles.seed';
import { seedUsers } from './users.seed';
import { seedCompanies } from './companies.seed';
import { seedCompanyRules } from './rules-companies.seed';
import { seedDevices } from './devices.seed';
import { seedUsersSystemSetting } from './users-system-setting';
import { seedRequests } from './rquests';

async function run() {
  console.log('🚀 Iniciando Seed...');

  await seedRoles(); // -> 1
  const company = await seedCompanies(); // -> 2
  const users = await seedUsers(company.id); // -> 3
  await seedCompanyRules(company.id); // -> 4
  await seedDevices(users.funcionario.id); // -> 5
  await seedRequests(users.admin.id, company.id); // -> 6
  await seedUsersSystemSetting(users.admin.id, company.id); // -> 7

  console.log('🎉 Seed finalizado com sucesso!');
}

run()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => process.exit());
