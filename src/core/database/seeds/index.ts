import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import AdminSeeder from './create-admin.seed';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
});

dataSource
  .initialize()
  .then(async (dataSource) => {
    await runSeeders(dataSource, {
      seeds: [
        AdminSeeder
      ],
    });
    console.log('✅ Seeding completed successfully');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
