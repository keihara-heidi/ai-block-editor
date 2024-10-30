import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export type FillTemplateRequest = {
  prompt: string;
  template: string;
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, template } = (await request.json()) as FillTemplateRequest;

    if (!prompt || !template) {
      return new Response('Prompt and template are required', { status: 400 });
    }
    const result = await streamText({
      model: openai('gpt-4o'),
      system: `You are a helpful assistant that templates ${template} based on given prompts. Any katex equations should be wrapped with $ signs. wrap any code with \`\`\` and the language after the first \`\`\``,
      prompt: `Prompt: ${prompt}\n\nPlease fill in the template according to the prompt and context.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
