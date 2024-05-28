"use server"
// This function is getting created to generate a url that a client can use to send the file to the server. If we don't have this server function, the client can upload or delete whatever they want in the bucket
export async function getSignedUrl() {
  return { success: { url: "" } }
}
