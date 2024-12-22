import { NextResponse } from 'next/server';
import OpenAI from 'openai';


export const openai = new OpenAI({
    organization: '',
    project: '',
})

// API route handler
export default async function handler(req: Request) {
    if (req.method === 'POST') {
        try {
            // Parse the request body
            const body = await req.json();
            const { content } = body;

            console.log(body);

            if (!content) {
                return NextResponse.json(
                    { error: 'Content is required for analysis.' },
                    { status: 400 }
                );
            }
            const res = await openai.completions.create({
                stream: false,
                model: 'gpt-3.5-turbo-instruct',
                prompt: `
                    Analyze the following chat messages. Categorize them into:
                    - Links/Resources
                    - Quotes/Inspirational Messages
                    - Personal Notes/Reflections
                    - Tasks/Action Items
                    - Brain Dumps
    
                        Also, detect themes, recognize patterns, and map relationships between messages.
                    Chat Data:
                    ${content}
                `,
            })

            console.log("Response: ", res);
            return NextResponse.json({
                // analysis: response.data.choices[0].message.content,
                result: res
            });
        } catch (error) {
            return NextResponse.json(
                { error: 'Error analyzing content. Please try again.' },
                { status: 500 }
            );
        }
    } else {
        NextResponse.error()
    }
}
