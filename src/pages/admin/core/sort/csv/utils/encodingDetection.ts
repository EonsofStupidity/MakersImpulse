export const detectEncoding = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer).slice(0, 4);
  
  if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return 'UTF-8';
  }
  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    return 'UTF-16BE';
  }
  if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
    return 'UTF-16LE';
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