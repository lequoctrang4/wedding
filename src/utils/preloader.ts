// Preload images and track progress
export const preloadImages = (
  imageUrls: string[],
  onProgress: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageUrls.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    let errorCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        const progress = Math.round(
          ((loadedCount + errorCount) / imageUrls.length) * 100
        );
        onProgress(progress);

        if (loadedCount + errorCount === imageUrls.length) {
          resolve();
        }
      };

      img.onerror = () => {
        errorCount++;
        const progress = Math.round(
          ((loadedCount + errorCount) / imageUrls.length) * 100
        );
        onProgress(progress);

        if (loadedCount + errorCount === imageUrls.length) {
          // Resolve even if some images fail to load
          resolve();
        }
      };

      img.src = url;
    });
  });
};
