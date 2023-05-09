import bcrypt from "bcrypt";

const hash = async (toHash: string): Promise<string> =>
  await bcrypt.hash(toHash, 10);

export default {
  hash,
};
