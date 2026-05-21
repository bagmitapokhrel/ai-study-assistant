import pdfParse from "pdf-parse";
import { Document } from "docx";

export async function parsePDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
  const DocumentLoader = Document as unknown as { load: (buffer: Buffer) => Promise<any> }
  const doc = await DocumentLoader.load(buffer)

  let text = ""
  doc.body.allChildren.forEach((child: any) => {
    if (child.text) {
      text += child.text + "\n"
    }
  })

  return text
}

export async function extractTextFromFile(
  file: File
): Promise<string> {
  const buffer = await file.arrayBuffer();
  const arrayBuffer = Buffer.from(buffer);

  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".pdf")) {
    return parsePDF(arrayBuffer);
  } else if (fileName.endsWith(".docx")) {
    return parseDOCX(arrayBuffer);
  } else if (fileName.endsWith(".txt")) {
    return arrayBuffer.toString("utf-8");
  } else {
    throw new Error("Unsupported file format. Use PDF, DOCX, or TXT.");
  }
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}
