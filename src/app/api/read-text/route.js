import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'text.txt');
  
  try {
    // קרא את התוכן מהקובץ
    const content = fs.readFileSync(filePath, 'utf8');
    // חלוק את התוכן לשורות
    const lines = content.split('\n').filter(line => line.trim() !== ''); // מסנן שורות ריקות
    return new Response(JSON.stringify({ lines }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read file' }), { status: 500 });
  }
}
