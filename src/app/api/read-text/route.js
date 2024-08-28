import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "text.txt");

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return new Response(JSON.stringify({ lines }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read file" }), {
      status: 500,
    });
  }
}
