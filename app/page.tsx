'use client';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [response, setResponse] = useState<string>('');


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleGenerate = async () => {
        if (!selectedFile) {

            alert('Please select a file first');
            return;
        }
        // Handle file processing here

        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile);

        fileReader.onload = async (e) => {
            const fileText = e.target?.result;

            // console.log('Extracted text:', fileText);
            // const res = await axios.post('/api', {
            //     content: fileText
            // }, )



            //const genAI = new GoogleGenerativeAI("YOUR_API_KE");
            //const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `
                    Analyze the following chat messages. Categorize them into:
                    - Links/Resources
                    - Quotes/Inspirational Messages
                    - Personal Notes/Reflections
                    - Tasks/Action Items
                    - Brain Dumps
    
                        Also, detect themes, recognize patterns, and map relationships between messages.
                    Chat Data:
                    ${fileText}
                `;

            const result = await model.generateContent(prompt);
            console.log(result.response.text());
            setResponse(result.response.text());

            /*
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
                    ${fileText}
                `,
            })

           */

            //console.log("Response: ", res);

            // const res = await fetch('/api', {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     method: "POST",
            //     body: JSON.stringify(fileText)
            // });
            // if(res) {
            //     console.log("Response is: ", res);
            // }
        }


        // console.log('Processing file:', selectedFile);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-8 rounded-xl bg-white/10 p-8 backdrop-blur-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">File Generator</h1>
                        <p className="mt-2 text-gray-200">Upload your text file to generate content</p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="relative">
                            <label
                                htmlFor="file-upload"
                                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white/5 hover:bg-white/10 transition-all"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="mb-3 h-10 w-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-200">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-200">Text files only</p>
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept=".txt"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {selectedFile && (
                            <p className="text-sm text-gray-200">
                                Selected file: {selectedFile.name}
                            </p>
                        )}

                        <button
                            onClick={handleGenerate}
                            className="w-full transform rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white transition-all hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Generate
                        </button>
                    </div>

                    <div className=''>
                        <p>
                            {response.split('*')}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
