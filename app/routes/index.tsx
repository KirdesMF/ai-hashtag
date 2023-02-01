import {
  json,
  type LoaderArgs,
  redirect,
  type ActionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getHashTags } from "~/utils/openAI";
import { commitSession, getSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const hashtags = (session.get("current-hashtags") as string) || "";

  return json(hashtags);
}

export async function action({ request }: ActionArgs) {
  // get form data
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  // get session
  const session = await getSession(request.headers.get("Cookie"));

  if (_action === "generate") {
    // fetch from openAI
    const res = await getHashTags(values.description as string);

    // save to session
    session.set("current-hashtags", res.choices[0].text);

    // return json and set cookie
    return json(res, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  if (_action === "save") {
    // save to session
    session.set("current-hashtags", values.hashtags);

    //  redirect to hashtags dashboard and set cookie
    return redirect("/hashtags", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1 className="text-3xl font-bold">Keep your #hashtags</h1>

      <p>
        Simply enter a description of your content and our algorithm will
        generate relevant hashtags to help increase the reach of your tweets.
        You can also manually add hashtags and save them for future use. Create
        an account to categorize and save your hashtags for easy access. Start
        maximizing your social media presence today!
      </p>

      <Form method="post">
        <textarea name="description" className="border" />
        <button type="submit" name="_action" value="generate">
          Generate
        </button>
      </Form>

      {data && (
        <div>
          <p>{data}</p>
          <Form method="post">
            <input type="hidden" name="hashtags" value={data} />
            <button type="submit" name="_action" value="save">
              Save
            </button>

            <button type="submit" name="_action" value="reset">
              Reset prompt
            </button>
          </Form>

          <button type="button">Copy</button>
        </div>
      )}
    </main>
  );
}
