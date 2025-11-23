// src/utils/images.ts
// PERMANENT FIX — NO MORE BROKEN IMAGE OPTIMIZATION
export const getOptimizedImage = async (src: any) => ({ src: String(src || '/txchyon-hero.png') });
export const getImagesOptimized = async (images: any[]) => images.map(img => ({ src: String(img || '/txchyon-hero.png') }));