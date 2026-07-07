import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!@#', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@evoltech.com' },
    update: {},
    create: {
      email: 'admin@evoltech.com',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create sample customer
  const customerPassword = await bcrypt.hash('Customer123!@#', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+254700000000',
      company: 'Tech Corp Ltd',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });
  console.log(`✅ Customer user created: ${customer.email}`);

  console.log('🌱 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });