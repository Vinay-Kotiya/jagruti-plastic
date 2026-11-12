import cloudinary from "@/lib/cloudinary";

export const IMAGE_FOLDER = "jagruti-plastic/products";

export function uploadImage(buffer: Buffer): Promise<{ publicId: string; url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: IMAGE_FOLDER, resource_type: "image", allowed_formats: ["jpg", "png", "webp"] }, (err, res) => {
        if (err || !res) return reject(err ?? new Error("Upload failed"));
        resolve({ publicId: res.public_id, url: res.secure_url });
      })
      .end(buffer);
  });
}

/** Best-effort cleanup: a failed delete must never block a product operation. */
export async function destroyImages(publicIds: string[]) {
  await Promise.allSettled(publicIds.map((id) => cloudinary.uploader.destroy(id)));
}
