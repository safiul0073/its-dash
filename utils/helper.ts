export const convertByteToKB = (bytes: number): string => {
  return (bytes / 1024).toFixed(2) + "KB";
};

export const checkIsImage = (ext: string): boolean => {
  switch (ext) {
    case "pdf":
      return false;
    case "html":
      return false;
    case "ai":
      return false;
    case "fig":
      return false;
    case "zip":
      return false;
    default:
      return true;
  }
};
