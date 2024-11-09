import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectToDB } from "@utils/databasse";

const handler = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) { 
            try {
                const sessionUser = await User.findOne({
                    email: session.user.email
                });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                
                return session; // Return the modified session
            } catch (error) {
                console.error("Session callback error:", error);
                return session; // Return original session in case of error
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
        
                const userExists = await User.findOne({ 
                    email: profile.email, 
                });
        
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(), // Replace spaces
                        image: profile.picture
                    });
                }
        
                return true; // Successful sign-in
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // This will cause an "Access Denied" message
            }
        }
    },
});

export { handler as GET, handler as POST };
