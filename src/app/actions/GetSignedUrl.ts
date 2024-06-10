"use server"

// This function is used to generate a url that a client can use to send the file to the S3 bucket and if we don't have this server function, acting as an intermediary, the user can upload or delete whatever they want in the bucket
export async function getSignedUrl() {
  return { success: { url: "" } }
}
