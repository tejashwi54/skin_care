const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (
  buffer,
  folder = "clear-skin/products"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",

          transformation: [
            {
              width: 1200,
              height: 1200,
              crop: "limit",
            },
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

    uploadStream.end(buffer);
  });
};

module.exports = uploadToCloudinary;