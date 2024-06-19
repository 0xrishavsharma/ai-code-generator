"use server"
import { auth } from "@/app/api/auth/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION_LOCAL!,
  credentials: {
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_LOCAL!,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY_LOCAL!,
  },
})

// Accepted file types and size
const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
const maxFileSize = 1024 * 1024 * 5 // 5MB

// This function is used to generate a url that a client can use to send the file to the S3 bucket and if we don't have this server function, acting as an intermediary, the user can upload or delete whatever they want in the bucket
export async function getSignedURL(fileInfo: {
  name: string
  type: string
  size: number
  checksum: string //Getting this from the client will make sure that the file arrives at s3 in the same way it arrived from the client i.e without any corruption
}) {
  const session = await auth()

  // All these fields will be included in the signedUrl that will be send to the client for the file upload to make sure what client is saying also reaches the S3 bucket with the help of the SignedUrl
  if (!session || !session.user) {
    return { failure: "You must be logged in to upload a file" }
  }

  if (!acceptedFileTypes.includes(fileInfo.type)) {
    return { failure: "File type not accepted" }
  }

  if (fileInfo.size > maxFileSize) {
    return { failure: "File size too large" }
  }

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME_LOCAL!,
    Key: `uploads/${session.user.name}/${fileInfo.name}`, //Name of the uploaded file in S3
    ContentType: fileInfo.type,
    ContentLength: fileInfo.size,
    ChecksumSHA256: fileInfo.checksum,
  })

  const signedUrl = await getSignedUrl(s3Client, putObjCommand, {
    expiresIn: 60,
  })
  return { success: { url: signedUrl } }
}
