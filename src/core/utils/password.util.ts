import * as crypto from 'crypto';

export function generatePassword(length: number = 12): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return Array.from({ length }, () => {
    const randomIndex = crypto.randomInt(0, chars.length);
    return chars[randomIndex];
  }).join('');
}