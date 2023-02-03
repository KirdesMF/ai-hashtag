import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getHashTags } from "~/utils/openAI.server";

export async function action({ request }: ActionArgs) {
  // get form data
  const body = await request.formData();
  const description = body.get("description") as string;

  // fetch from openAI
  const res = await getHashTags(description as string);

  // return json and set cookie
  return json(res.choices[0].text);
}

export default function Index() {
  const data = useActionData<typeof action>();
  const [hashtags, setHashtags] = useState(data);

  useEffect(() => setHashtags(data), [data]);

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
        <textarea name="description" className="border bg-green-200 " />
        <button type="submit">Generate</button>
      </Form>

      {data && (
        <div>
          <p>{hashtags}</p>

          <button type="button">Reset prompt</button>
          <button type="button">Copy</button>
        </div>
      )}
    </main>
  );
}
