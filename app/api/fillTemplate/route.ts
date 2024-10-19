// File: app/api/fillTemplate/route.ts
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

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

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that fills in HTML templates based on given prompts. Any katex equations should be wrapped with $ signs.',
        },
        {
          role: 'user',
          content: `Prompt: ${prompt}\n ${template}\n\nPlease fill in the template according to the prompt and context. Return only the filled HTML.`,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(encoder.encode(content));
          }
          controller.close();
        },
      }),
      {
        headers: {
          'Content-Type': 'text/plain',
          'Transfer-Encoding': 'chunked',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
