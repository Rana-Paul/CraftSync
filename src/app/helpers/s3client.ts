import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

export const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export const generateUploadUrl = ({key, contentType}: {key: string, contentType: string}) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: key,
        ContentType: contentType,
    });

    const url = getSignedUrl(s3Client, command, { expiresIn: 28800 });
}