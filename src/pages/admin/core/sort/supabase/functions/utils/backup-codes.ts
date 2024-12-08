export function generateBackupCodes(count = 8, length = 10): string[] {
  const codes: string[] = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < count; i++) {
    let code = '';
    for (let j = 0; j < length; j++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    codes.push(code);
  }

  return codes;
}