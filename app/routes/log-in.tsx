import { json, type ActionArgs } from "@remix-run/node";
import { Form, useMatches } from "@remix-run/react";
import { useEffect } from "react";

export async function loader() {
  return {
    ok: true,
  };
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const email = body.get("email") as string;
  const password = body.get("password") as string;

  return json(email);
}

export default function Login() {
  const data = useMatches();

  useEffect(() => console.log(data), [data]);
  return (
    <main>
      <h1>Log In</h1>

      <Form>
        <label>
          Email
          <input type="email" name="email" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>

        <button type="submit">Log In</button>
      </Form>
    </main>
  );
}
