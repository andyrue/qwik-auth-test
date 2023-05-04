import { component$ } from "@builder.io/qwik";
import { Form, routeLoader$ } from "@builder.io/qwik-city";
import { useAuthSignin } from "../plugin@auth";

export const useGetCsrfToken = routeLoader$(async () => {
  const response = await fetch("http://127.0.0.1:5174/api/auth/csrf");
  const token = await response.json();
  console.log(token);
  return token.csrfToken;
});

export default component$(() => {
  const signIn = useAuthSignin();
  const csrfToken = useGetCsrfToken();

  return (
    <div>
      <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Sign In
            </h2>
          </div>
          <Form class="mt-8 space-y-6" action={signIn}>
            <input type="hidden" name="csrfToken" value={csrfToken.value} />
            <input type="hidden" name="providerId" value="credentials" />
            <input type="hidden" name="remember" value="true"></input>
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="username" class="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  class="relative block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-nadblue sm:text-sm sm:leading-6"
                  placeholder="Username"
                ></input>
              </div>
              <div>
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  class="relative block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-nadblue sm:text-sm sm:leading-6"
                  placeholder="Password"
                ></input>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full bg-blue-400 p-3">
                Sign In
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});
