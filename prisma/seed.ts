import { PrismaClient } from '@prisma/client';
import { env } from 'node:process';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: env.ADMIM_USER,
    },
    update: {},
    create: {
      email: env.ADMIM_USER,
      password: env.ADMIM_PASSWORD,
      accessToken: uuid(),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
