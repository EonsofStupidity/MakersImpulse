import { DelimiterType, FileEncoding } from "../types/parsing";

export const detectDelimiter = (text: string): DelimiterType => {
  const counts = {
    comma: (text.match(/,/g) || []).length,
    semicolon: (text.match(/;/g) || []).length,
    tab: (text.match(/\t/g) || []).length,
    pipe: (text.match(/\|/g) || []).length,
  };

  const maxDelimiter = Object.entries(counts).reduce((a, b) => 
    counts[a[0] as keyof typeof counts] > counts[b[0] as keyof typeof counts] ? a : b
  );

  return maxDelimiter[0] as DelimiterType;
};

export const detectEncoding = async (file: File): Promise<FileEncoding> => {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer).slice(0, 4);
  
  if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return 'UTF-8';
  }
  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    return 'UTF-16';
  }
  if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
    return 'UTF-16';
  }
  
  try {
    const text = await file.text();
    const decoder = new TextDecoder('UTF-8', { fatal: true });
    decoder.decode(new TextEncoder().encode(text));
    return 'UTF-8';
  } catch {
    return 'ISO-8859-1';
  }
};