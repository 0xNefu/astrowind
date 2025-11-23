// src/utils/images.ts
// Restored – fixes findImage error on Cloudflare

import type { ImageMetadata } from 'astro';

export const findImage = (imagePath?: string | ImageMetadata | null): string | undefined => {
  if (!imagePath) return undefined;

  if (typeof imagePath === 'string') {
    // If it's already a full URL (like external placeholder), return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If it's a local path like /blog/something.jpg
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
  }

  return undefined;
};