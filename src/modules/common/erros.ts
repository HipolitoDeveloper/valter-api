import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

class SystemError extends Error {
	statusCode: number;
	code: number;
	message: string;

	constructor(statusCode: number, code: number, message: string) {
		super();
		this.statusCode = statusCode;
		this.code = code;
		this.message = message;
	}
}

export class BadRequestError extends SystemError {
	static statusCode = 400;

	constructor(code: number, message: string) {
		super(BadRequestError.statusCode, code, message);
	}
}

export class UnauthorizedError extends SystemError {
	static statusCode = 401;

	constructor(code: number, message: string) {
		super(UnauthorizedError.statusCode, code, message);
	}
}

export class EmailError extends SystemError {
	static statusCode = 500;

	constructor(code: number, message: string) {
		super(EmailError.statusCode, code, message);
	}
}

export const errorHandler = (error: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
	if (error.validation) {
		reply.status(422).send(error);
		return;
	}

	if (error.statusCode) {
		reply.status(error.statusCode).send(error);
		return;
	}

	// reply.status(500).send({
	// 	statusCode: 500,
	// 	code: Constants.SYSTEM_ERRO_GENERIC_CODE,
	// 	message: Constants.SYSTEM_ERRO_GENERIC_MESSAGE,
	// });
};

export const handleMongooseUniqueConstraintError = (error: any) => {
	if (error.code === 11000) {
		const key = Object.keys(error.keyPattern);
        console.log(key)
		const uniqueConstraintField = key[0];
		return uniqueConstraintField;
	}
};
