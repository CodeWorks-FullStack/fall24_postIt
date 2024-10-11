import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import sharp from "sharp"

const s3client = new S3Client({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})


class ImageUploadService {
  async uploadWithSharp(imageData, userId) {
    const sharpImg = sharp(imageData.data)
    const metaData = await sharpImg.metadata()
    // const shrink = sharpImg.resize({ width: Math.round(metaData.width / 4) })
    // const jpeg = shrink.jpeg({ quality: 80, chromaSubsampling: '4:4:4' })
    const webp = sharpImg.webp({ quality: 50 })
    imageData.data = await webp.toBuffer()
    imageData.mimetype = 'image/webp'
    imageData.width = metaData.width
    imageData.height = metaData.height
    return this.uploadImage(imageData, userId)
  }

  async uploadImage(imageData, userId) {
    const uploadRequest = new PutObjectCommand({
      Bucket: 'pugs-bucket',
      Key: `${userId}/${imageData.name}`,
      ContentType: imageData.mimetype,
      CacheControl: 'max-age=36000',
      Body: imageData.data
    })
    const uploadResponse = await s3client.send(uploadRequest)
    return { url: `https://pugs-bucket.s3.us-west-2.amazonaws.com/${userId}/${imageData.name}`, width: imageData.width, height: imageData.height, size: imageData.data.length }
  }

}

export const imageUploadService = new ImageUploadService()
