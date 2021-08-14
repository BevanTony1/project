import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address) 
                const res = await fetch("http://127.0.0.1:8001/api/method/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        usr: credentials.username,
                        pwd: credentials.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    session: {
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {

        async session(session, token) {


            session.token = token.user
            return session;
        },

        async jwt(token, user, account, profile) {


            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            if (typeof user !== typeof undefined) {
                token.user = user?.token;
            }
            return token;
        }
    },

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
})