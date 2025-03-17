import { serve } from "bun";

import { Hono, type Context } from 'hono'

const handler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const file = body['file']
        const filename = c.req.header('filename') ?? body['filename']
        const accessKeyId = c.req.header('accessKeyId') ?? body['accessKeyId']
        const secretAccessKey = c.req.header('secretAccessKey') ?? body['secretAccessKey']
        const bucket = c.req.header('bucket') ?? body['bucket']
        const endpoint = c.req.header('endpoint') ?? body['endpoint']
    
        const client = new Bun.S3Client({
            accessKeyId,
            secretAccessKey,
            bucket,
            endpoint
        })
        const s3file = client.file(filename);
        await s3file.write(Buffer.from(file, 'base64'))
        return c.json({
            'data': filename
        })
    } catch (err) {
        return c.json({
            'data': (err as Error).message
        }, 500)
    }
}
const app = new Hono()
    .get('/up', c => c.json({ status: 'up' }))
    .get('/cloudflare-r2', (c) => c.redirect('https://netcup.gifts/lee/docs/opensource/upic'))
    .post('/cloudflare-r2', handler)
    .post('/cloudflare-r2', handler)

serve({
    fetch: app.fetch
})