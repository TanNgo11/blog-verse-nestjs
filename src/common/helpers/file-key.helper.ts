import { randomUUID } from 'crypto';
import * as path from 'path';

export function generateFileKey(originalName: string): string {
  const extension = path.extname(originalName);
  const filename = path.basename(originalName, extension);
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '_');
  const uuid = randomUUID();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `uploads/${year}/${month}/${day}/${sanitizedFilename}_${uuid}${extension}`;
}
