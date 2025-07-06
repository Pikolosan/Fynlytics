import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUserEmail = "default@demo.com";

  // Check if the default user already exists
  let user = await prisma.user.findUnique({
    where: { email: defaultUserEmail }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkUserId: "default_user_1",
        email: defaultUserEmail,
        name: "Demo User",
        imageUrl: "/default-user.png"
      }
    });
    console.log("Default user created:", user.id);
  } else {
    console.log("Default user already exists:", user.id);
  }

  process.exit();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
