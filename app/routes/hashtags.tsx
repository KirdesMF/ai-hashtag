import { Form, Link } from "@remix-run/react";

export default function Hashtag() {
  return (
    <main>
      <Link to="/">Home</Link>

      <Form method="post">
        <button>Remove</button>
      </Form>
    </main>
  );
}
