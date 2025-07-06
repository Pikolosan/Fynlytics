import { db } from "@/lib/prisma"; 
import { ObjectId } from "mongodb";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function createAccount(data) {
  try {
    const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID;

    if (!DEFAULT_USER_ID) throw new Error("Missing default user ID");

    const user = await db.user.findUnique({
      where: { id: new ObjectId(DEFAULT_USER_ID) },
    });

    if (!user) throw new Error("Default user not found");

    // Convert balance to float
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}
