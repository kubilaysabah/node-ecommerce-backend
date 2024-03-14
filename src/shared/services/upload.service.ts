import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import AWS from 'aws-sdk'

@Injectable()
export class UploadService {
	private s3: AWS.S3

	constructor(private configService: ConfigService) {
		this.s3 = new AWS.S3({
			region: this.configService.get('AWS_REGION'),
			credentials: {
				secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
				accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
			},
		})
	}

	async uploadFile(file: Buffer, bucket: string, name: string): Promise<AWS.S3.ManagedUpload.SendData> {
		const params = {
			Bucket: bucket,
			Key: name,
			Body: file,
		}

		return this.s3.upload(params).promise()
	}
}
