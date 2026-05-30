import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

if (
  !process.env['B2_ENDPOINT'] ||
  !process.env['B2_KEY_ID'] ||
  !process.env['B2_APPLICATION_KEY']
) {
  throw new Error('Missing Backblaze B2 environment variables');
}

export const b2Client = new S3Client({
  endpoint: process.env['B2_ENDPOINT'],
  region: process.env['B2_REGION'] || 'us-east-005',
  credentials: {
    accessKeyId: process.env['B2_KEY_ID'],
    secretAccessKey: process.env['B2_APPLICATION_KEY'],
  },
});
