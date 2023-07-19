import { type IncomingHttpHeaders } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import { type WebhookEvent } from "@clerk/clerk-sdk-node"
import { buffer } from "micro"
import { Webhook, type WebhookRequiredHeaders } from "svix"

import { prisma } from "@acme/db"

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
    api: {
        bodyParser: false,
    },
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || ""

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse,
) {
    // Verify the webhook signature
    // See https://docs.svix.com/receiving/verifying-payloads/how
    const payload = (await buffer(req)).toString()
    const headers = req.headers
    const wh = new Webhook(webhookSecret)
    let evt: WebhookEvent | null = null
    try {
        evt = wh.verify(payload, headers) as WebhookEvent
    } catch (_) {
        return res.status(400).json({
            error: "Invalid webhook signature",
        })
    }

    // Handle the webhook
    const eventType = evt.type
    if (eventType === "user.created") {
        const { id, email_addresses } = evt.data

        const [emailAdressObject] = email_addresses

        if (!emailAdressObject || emailAdressObject.email_address === undefined) {
            return res.status(400).json({
                error: "No email address",
            })
        }

        await prisma.user.create({
            data: {
                id,
                email: emailAdressObject.email_address,
            },
        })

    }

    res.json({})
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders
}
