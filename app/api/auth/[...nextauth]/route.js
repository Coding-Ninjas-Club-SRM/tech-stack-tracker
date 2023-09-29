import { User } from "@models";
import { connectToDB } from "@utils";
import bcrypt from "bcrypt";
import nextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      callbacks: {
        async redirect(url, baseurl) {
          return "/";
        },
      },

      async authorize(credentials) {
        await connectToDB();

        const { email, password } = credentials;
        if (!email || !password) return null;

        const user = await User.findOne({ email });

        if (!bcrypt.compareSync(password, user.password)) return null;

        user.id = user._id;

        return user;
      },
    }),
  ],
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
