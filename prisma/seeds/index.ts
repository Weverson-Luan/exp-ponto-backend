/**
 * IMPORTS
 */
import { seedRoles } from './roles.seed';
import { seedUsers } from './users.seed';
import { seedCompanies } from './companies.seed';
import { seedCompanyRules } from './rules-companies.seed';
import { seedDevices } from './devices.seed';

async function run() {
  console.log('🚀 Iniciando Seed...');

  await seedRoles();
  const company = await seedCompanies();
  const users = await seedUsers(company.id);
  await seedCompanyRules(company.id);
  await seedDevices(users.funcionario.id);

  console.log('🎉 Seed finalizado com sucesso!');
}

run()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => process.exit());
