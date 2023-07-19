import { encode } from "blurhash"
import fetch from "node-fetch"
import sharp from "sharp"

export interface IOptions {
    size?: number
}

export interface IInput {
    url: string
    options?: IOptions
}

export const blurhashFromURL = async (
    url?: string | null,
    options: IOptions = {},
) => {
    try {
        if (!url) {
            throw new Error("No URL provided")
        }

        const { size = 32 } = options

        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        const returnedBuffer = Buffer.from(arrayBuffer)

        const { info, data } = await sharp(returnedBuffer)
            .resize(size, size, {
                fit: "inside",
            })
            .ensureAlpha()
            .raw()
            .toBuffer({
                resolveWithObject: true,
            })

        const encoded = encode(
            new Uint8ClampedArray(data),
            info.width,
            info.height,
            4,
            4,
        )

        return encoded
    } catch (err) {
        console.log("\n\n\n\nERROR GENERATING BLURHASH\n\n\n\n")
        console.error(JSON.stringify(err, null, 2))
        return null
    }
}
