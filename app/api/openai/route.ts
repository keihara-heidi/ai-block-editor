import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { templateBlocks, prompt } = await req.json();

  if (!templateBlocks || !prompt) {
    return NextResponse.json(
      { error: 'Template blocks and prompt are required.' },
      { status: 400 }
    );
  }

  try {
    // Convert templateBlocks to text format if needed (assuming it needs serialization)
    const templateText = templateBlocks.map((block: any) => block.text).join('\n');
    console.log(templateText);
    const response = await openai.chat.completions.create({
      model: 'gpt-4-0613',
      messages: [
        {
          role: 'system',
          content: `You are an assistant that fills in the template with the provided prompt.`,
        },
        { role: 'user', content: `${templateText}\nPrompt: ${prompt}` },
      ],
    });

    const generatedText = response.choices[0]?.message?.content;

    if (generatedText) {
      // Create the output in the same format as the input
      const filledTemplate = templateBlocks.map((block: any, index: number) => ({
        ...block,
        text: generatedText.split('\n')[index] || block.text,
      }));
      console.log(filledTemplate);
      return NextResponse.json(filledTemplate);
    } else {
      return NextResponse.json({ error: 'Failed to generate note.' }, { status: 500 });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
