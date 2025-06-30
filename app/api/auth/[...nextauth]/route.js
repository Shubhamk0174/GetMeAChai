import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";

import User from '@/models/User';
import Payments from '@/models/Payments';
import connectDB from '@/db/connectDb';
import mongoose from 'mongoose';



export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        // connect to the database 
         await connectDB();
        // check if the user already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          // if the user does not exist, create a new user
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.email.split('@')[0],
            profilePicture: null,
            coverPicture: null,
          });

          await newUser.save();

        }
        return true;
      }
    },
    async session({ session, user, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if(dbUser) {
        // If the user exists in the database, set the session user ID to the username
        session.user.id = dbUser.username;
      }
      
      return session
    },
  }
})



export { authoptions as GET, authoptions as POST }
