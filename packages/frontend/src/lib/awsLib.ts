import { Storage } from "aws-amplify";

export async function s3Upload(file: File) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function s3Delete(filename: string) {
  try {
      await Storage.vault.remove(filename);
      console.log(`File deleted successfully: ${filename}`);
  } catch (error) {
      console.error(`Error in file deletion: ${error}`);
      throw error;
  }
}