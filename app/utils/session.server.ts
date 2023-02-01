import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "session",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };
