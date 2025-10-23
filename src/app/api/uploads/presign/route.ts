import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  buildS3ObjectUrl,
  createS3Client,
  resolveS3BucketRegion,
} from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType } = await req.json();

    const configuredRegion = process.env.AWS_REGION?.trim();
    const bucket = process.env.AWS_BUCKET_NAME?.trim();

    if (!bucket) {
      return NextResponse.json({ error: "Missing S3 configuration" }, { status: 500 });
    }

    const credentials = {
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID || "").trim(),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY || "").trim(),
    };

    const region = await resolveS3BucketRegion(bucket, configuredRegion, credentials);

    const key = `products/${Date.now()}-${Math.random().toString(36).slice(2)}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

    const client = createS3Client(region, credentials);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      // Intentionally omit ContentType to avoid requiring the browser to send the
      // Content-Type header (which triggers CORS preflight). If you need ContentType
      // stored, you can set it later via a copy or metadata update.
      // Also omit ACL; use bucket policy/CF for public access.
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    const objectUrl = buildS3ObjectUrl(bucket, region, key);

    return NextResponse.json({ signedUrl, key, objectUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Failed to generate presigned URL" }, { status: 500 });
  }
}
