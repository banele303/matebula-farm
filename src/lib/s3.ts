import { GetBucketLocationCommand, S3Client } from "@aws-sdk/client-s3";

const DEFAULT_REGION = "us-east-1";

export type S3Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

let cachedBucketRegion: string | null = null;

export async function resolveS3BucketRegion(
  bucket: string,
  configuredRegion: string | undefined,
  credentials: S3Credentials
): Promise<string> {
  if (cachedBucketRegion) {
    return cachedBucketRegion;
  }

  // If the app is configured with a region, trust it and avoid calling GetBucketLocation
  // This prevents noisy AccessDenied logs when the IAM user lacks s3:GetBucketLocation permission.
  if (configuredRegion && configuredRegion.length > 0) {
    cachedBucketRegion = configuredRegion;
    return cachedBucketRegion;
  }

  try {
    const locationClient = new S3Client({
      region: DEFAULT_REGION,
      credentials,
    });

    const { LocationConstraint } = await locationClient.send(
      new GetBucketLocationCommand({ Bucket: bucket })
    );

    const normalized = normalizeLocation(LocationConstraint);
    cachedBucketRegion = normalized;
  } catch (error) {
    console.warn("S3: GetBucketLocation failed; falling back to default region", error);
    cachedBucketRegion = DEFAULT_REGION;
  }

  return cachedBucketRegion;
}

export function buildS3ObjectUrl(bucket: string, region: string, key: string) {
  const encodedKey = encodeURIComponent(key);
  if (region === DEFAULT_REGION) {
    return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}

export function createS3Client(region: string, credentials: S3Credentials) {
  return new S3Client({
    region,
    credentials,
    forcePathStyle: false,
  });
}

function normalizeLocation(location?: string | null) {
  if (!location || location.length === 0) {
    return DEFAULT_REGION;
  }

  if (location === "EU") {
    return "eu-west-1";
  }

  return location;
}
