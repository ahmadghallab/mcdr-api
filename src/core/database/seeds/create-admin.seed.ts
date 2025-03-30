import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Admin } from 'src/domains/admin/v1/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { AdminRole } from 'src/core/common/enums/admin-role.enum';

export default class AdminSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
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
    admin.password = await bcrypt.hash('mcdr@2025', 10);

    await adminRepository.save(admin);
    console.log('✅ Admin created successfully:', admin.email);
  }
}
