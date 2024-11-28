import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "../../../../Lib/db";
import Analyst from "../../../../Models/AnalystsSchema";
import { Types } from 'mongoose';

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  try {
    console.log('Verification attempt:', {
      plainPassword,
      hashedPassword,
      hashFormat: hashedPassword.substring(0, 7)
    });
    
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Verification result:', result);
    
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Password verification error:", error.message);
    } else {
      console.error("Password verification error:", error);
    }
    return false;
  }
}

async function getAnalystFromDb(email: string) {
  try {
    await connectToMongoDB();
    
    const analyst = await Analyst.findOne(
      { email },
      'email firstName lastName password role status'
    );
    
    if (analyst) {
      console.log('Found analyst:', {
        email: analyst.email,
        hasPassword: !!analyst.password,
        passwordFormat: analyst.password?.substring(0, 7)
      });
    }
    
    return analyst;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database error:", error.message);
    } else {
      console.error("Database error:", error);
    }
    return null;
  }
}

interface AuthorizeError extends Error {
  message: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email",
          type: "email",
          placeholder: "analyst@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••"
        }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const analyst = await getAnalystFromDb(credentials.email as string);

          if (!analyst) {
            throw new Error("No user found with this email");
          }

          console.log('Attempting password verification for:', credentials.email);

          const isValidPassword = await verifyPassword(
            credentials.password as string,
            analyst.password
          );

          if (!isValidPassword) {
            console.log('Password verification failed for:', credentials.email);
            throw new Error("Invalid password");
          }

          console.log('Successfully authenticated:', credentials.email);

          return {
            id: analyst._id.toString(),
            email: analyst.email,
            name: `${analyst.firstName} ${analyst.lastName}`,
            role: analyst.role,
            status: analyst.status
          };
        } catch (error: unknown) {
          const authError = error as AuthorizeError;
          console.error("Authorization error:", {
            message: authError.message,
            email: credentials?.email
          });
          throw error;
        }
      }
    })
  ],
  debug: true,
  pages: {
    signIn: "/login",
    error: "/login"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});