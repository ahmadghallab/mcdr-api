
import { readFileSync } from 'fs';
import { AllowedFileType, FILE_SIGNATURES } from './file-validator.util';

export function validateMagicNumbers(filePath: string, expectedType: AllowedFileType): boolean {
  try {
    const expectedSignature = FILE_SIGNATURES[expectedType];
    const signatureLength = expectedSignature.length / 2; // Hex chars to bytes
    
    const fileData = readFileSync(filePath);
    const fileSignature = fileData
      .subarray(0, signatureLength)
      .toString('hex')
      .toUpperCase();
    
    return fileSignature.startsWith(expectedSignature);
  } catch (error) {
    return false;
  }
}

export function detectFileType(filePath: string): AllowedFileType | null {
  try {
    const fileData = readFileSync(filePath);
    const maxSignatureLength = Math.max(
      ...Object.values(FILE_SIGNATURES).map(sig => sig.length / 2)
    );
    const fileSignature = fileData
      .subarray(0, maxSignatureLength)
      .toString('hex')
      .toUpperCase();

    for (const [type, signature] of Object.entries(FILE_SIGNATURES)) {
      if (fileSignature.startsWith(signature)) {
        return type as AllowedFileType;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}