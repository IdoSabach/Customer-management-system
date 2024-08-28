import fs from 'fs';
import path from 'path';

export async function POST(req) {
  if (req.method === 'POST') {
    const { text } = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'text.txt');

    try {
      fs.writeFileSync(filePath, text + '\n', { flag: 'a' }); // הוסף את הטקסט לשורה חדשה
      return new Response(JSON.stringify({ message: 'Text saved successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to save text' }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }
}
