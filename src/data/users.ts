export interface User {
  username: string;
  password: string;
}

export const users = new Map([
  [
    "jsmith",
    {
      username: "jsmith",
      password: "12345",
    },
  ],
]);