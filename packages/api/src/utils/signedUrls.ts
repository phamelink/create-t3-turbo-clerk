import { Storage, type GetSignedUrlConfig } from "@google-cloud/storage"

// Creates a client

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME as string

async function generateReadSignedUrl(filepath: string) {
    try {
        const storage = new Storage()
        // These options will allow temporary read access to the file
        const options: GetSignedUrlConfig = {
            version: "v4",
            action: "read",
            expires: Date.now() + 24 * 3600 * 1000, // 15 minutes
            // contentType: "image/jpeg",
            // expires: makePublic
            // ? new Date(10000, 1, 1)
            // : Date.now() + 15 * 60 * 1000, // 15 minutes
        }

        // Get a v4 signed URL for reading the file
        const [url] = await storage
            .bucket(bucketName)
            .file(filepath)
            .getSignedUrl(options)

        return url
    } catch (err) {
        console.log("\n\n\n\nERROR GENERATING READ SIGNED URL\n\n\n\n")
        console.error(JSON.stringify(err, null, 2))
        return null
    }
}

async function generateWriteSignedUrl(filepath: string) {
    try {
        const storage = new Storage()
        // These options will allow temporary read access to the file
        const options: GetSignedUrlConfig = {
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            // contentType: "image/jpeg",
        }

        // Get a v4 signed URL for reading the file
        const [url] = await storage
            .bucket(bucketName)
            .file(filepath)
            .getSignedUrl(options)

        // console.log(`\n\n\nGenerated PUT signed URL:\n${url}\n\n\n`)

        return url
    } catch (err) {
        console.log("\n\n\n\nERROR GENERATING WRITE SIGNED URL\n\n\n\n")
        console.error(JSON.stringify(err, null, 2))
        return null
    }
}

export { generateReadSignedUrl, generateWriteSignedUrl }
