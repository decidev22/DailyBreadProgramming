type existingUser<Document> = {
  username: string;
  email: string;
  uid?: number;
  verification?: {
    randomSeed?: string;
    verified?: boolean;
    failCount?: number;
  };
  authentication?: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
};

export const createNewVerification = (
  user: existingUser<Document>
) => {
  const random_seed = Math.floor(
    Math.random() * (999999 - 100000) + 1
  );
  console.log(random_seed);
  return random_seed;
};
