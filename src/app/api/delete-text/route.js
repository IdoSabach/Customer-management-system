import fs from 'fs';
import path from 'path';

export async function DELETE(req) {
  const { text } = await req.json();
  const filePath = path.join(process.cwd(), 'data', 'text.txt');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    const newLines = lines.filter(line => line.trim() !== text.trim());

    fs.writeFileSync(filePath, newLines.join('\n').trim(), 'utf-8');

    return new Response(JSON.stringify({ message: 'Text deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete text' }), { status: 500 });
  }
}
