import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const email = body.get("email") as string;
  const password = body.get("password") as string;
}

export default function Login() {
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
