export type DemoLogin = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export const DEMO_LOGINS: DemoLogin[] = [
  {
    email: "alex@cdxi.digital",
    password: "VantageDemo1!",
    name: "Alex Kim",
    role: "Admin",
  },
  {
    email: "priya@cdxi.digital",
    password: "VantageDemo1!",
    name: "Priya Nair",
    role: "Customer success",
  },
  {
    email: "tom@cdxi.digital",
    password: "VantageDemo1!",
    name: "Tom Walsh",
    role: "Operations",
  },
];
