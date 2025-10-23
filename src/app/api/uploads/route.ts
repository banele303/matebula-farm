import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/lib/auth";
import {
  buildS3ObjectUrl,
  createS3Client,
  resolveS3BucketRegion,
} from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const configuredRegion = process.env.AWS_REGION?.trim();
    const bucket = process.env.AWS_BUCKET_NAME?.trim();

    if (!bucket) {
      console.error("Missing AWS configuration:", { bucket });
      return NextResponse.json({ error: "Missing S3 configuration" }, { status: 500 });
    }

    const credentials = {
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID || "").trim(),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY || "").trim(),
    };

    const resolvedRegion = await resolveS3BucketRegion(bucket, configuredRegion, credentials);

    const s3Client = createS3Client(resolvedRegion, credentials);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const key = `products/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);

      uploadedUrls.push(buildS3ObjectUrl(bucket, resolvedRegion, key));
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return NextResponse.json(
      { error: "Failed to upload files", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
