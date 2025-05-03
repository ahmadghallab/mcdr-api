import { Admin } from 'src/domains/admin/v1/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'src/core/config/typeorm.config';
import { AdminRole } from 'src/core/common/enums/admin-role.enum';

(async () => {
  const dataSource = await AppDataSource.initialize();

  try {
    console.log('🌱 Running AdminSeeder...');
    const adminRepository = dataSource.getRepository(Admin);

    const existingAdmin = await adminRepository.findOne({
      where: { email: 'admin@mcdr.com' },
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const admin = new Admin();
    admin.name = 'Super Admin';
    admin.email = 'admin@mcdr.com';
    admin.role = AdminRole.Owner;
    admin.password = await bcrypt.hash('Mcdr@2025', 10);

    await adminRepository.save(admin);
    console.log('✅ Admin created successfully:', admin.email);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await dataSource.destroy();
    process.exit(0);
  }
})();