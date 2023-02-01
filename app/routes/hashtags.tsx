import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { destroySession, getSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const description = (session.get("current-hashtags") as string) || "";

  return json(description);
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return json(
    { remove: true },
    {
      headers: { "Set-Cookie": await destroySession(session) },
    }
  );
}

export default function Hashtag() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      <p>{data}</p>
      <Link to="/">Home</Link>

      <Form method="post">
        <button>Save</button>
      </Form>
    </main>
  );
}
