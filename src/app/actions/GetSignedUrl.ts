"use server"
import { auth } from "@/app/api/auth/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY!,
  },
})

// This function is used to generate a url that a client can use to send the file to the S3 bucket and if we don't have this server function, acting as an intermediary, the user can upload or delete whatever they want in the bucket
export async function getSignedURL() {
  const session = await auth()

  if (!session) {
    return { failure: "You must be logged in to upload a file" }
  }

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME_LOCAL!,
    // Key: `uploads/${session.user?.id}/${file?.name}`, //Name of the uploaded file in S3
    Key: "test-file",
    // ContentType: file?.type,
  })

  const signedUrl = await getSignedUrl(s3Client, putObjCommand, {
    expiresIn: 60,
  })

  return { success: { url: signedUrl } }
}
