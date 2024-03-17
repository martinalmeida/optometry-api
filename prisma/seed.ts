import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  const password = await hash('paass123', Number(process.env.SALT_ROUNDS));
  const datetime = new Date();

  await prisma.users.create({
    data: {
      name: 'martin',
      lastname: 'almeida',
      email: 'martinalmeida56@gmail.com',
      password: password,
      created: datetime,
    },
  });

  await prisma.users.create({
    data: {
      name: 'admin',
      lastname: 'admin',
      email: 'admin@admin.com',
      password: password,
      created: datetime,
    },
  });
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
