import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as passport from 'passport'
import * as session from 'express-session'

// Modules
import { AppModule } from './app.module'

// Interceptors
import { LoggingInterceptor } from '@interceptors/logging.interceptor'
import { NotFoundInterceptor } from '@interceptors/not-found.interceptor'
;(async (): Promise<void> => {
	const app = await NestFactory.create(AppModule)

	app.use(
		session({
			secret: process.env.SECRET_KEY || '1234567890',
			resave: false,
			saveUninitialized: true,
			cookie: { secure: true },
		}),
	)

	app.use(passport.initialize())
	app.use(passport.session())

	/* CORS */
	app.enableCors({
		origin: '*',
	})

	/* Prefix */
	app.setGlobalPrefix('api')

	/* Validation */
	app.useGlobalPipes(new ValidationPipe())

	/* Interceptors */
	app.useGlobalInterceptors(new LoggingInterceptor())
	app.useGlobalInterceptors(new NotFoundInterceptor())

	/* Swagger */
	const config = new DocumentBuilder()
		.setTitle('E-Commerce API Document')
		.setDescription('The E-Commerce API description')
		.setVersion('1.0')
		.addBearerAuth(
			{
				// I was also testing it without prefix 'Bearer ' before the JWT
				description: `[just text field] Please enter token in following format: Bearer <JWT>`,
				name: 'Authorization',
				bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
				scheme: 'Bearer',
				type: 'http', // I`ve attempted type: 'apiKey' too
				in: 'Header',
			},
			'authorization',
		)
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('', app, document)

	await app.listen(3000)
})()
