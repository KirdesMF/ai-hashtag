type OpenAIPayload = {
  prompt: string;
  max_tokens: number;
  model: string;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  frequency_penalty: number;
  presence_penalty: number;
};

type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export async function getHashTags(description: string) {
  const payload: OpenAIPayload = {
    prompt: description,
    max_tokens: 10,
    model: "text-davinci-003",
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const res = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as OpenAIResponse;

  return data;
}
