import { serverAuth$ } from "@builder.io/qwik-auth";
import type { Provider } from "@auth/core/providers";
import Credentials from "@auth/core/providers/credentials";
import { users } from "~/data/users";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Credentials({
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          console.log(credentials);
          if (credentials) {
            const user = users.get(credentials.username as string);
            if (user) {
              if (user.password === credentials.password) {
                return { id: user.username, name: user.username };
              }
            }
          }
          return null;
        },
      }),
    ] as Provider[],
    pages: {
      signIn: "/login",
    },
  }));
