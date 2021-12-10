import jwt, { JwtPayload } from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-http-bearer';
import {UserModel as User} from '../modules/user/UserModel'
 
interface TokenPayload extends JwtPayload {
	userID: number;
}

type ValidationDoneCallback = (
	error: unknown,
	user?: typeof User | false,
	options?: IVerifyOptions | string
) => void;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const generateBearerToken = (userID: number) =>
	jwt.sign({ userID }, TOKEN_SECRET || 'teste', {
		expiresIn: '1h',
	});

const validateBearerToken = async (token: string, done: ValidationDoneCallback) => {
	try {
		
		const decodedToken = jwt.verify(token, TOKEN_SECRET || "teste") as TokenPayload;
		const user: any = await User.findOne({  _id: decodedToken.userID  });
		if (!user) {
			return done(null, false);
		} 
		done(null, user);
	} catch (error) {
		
		return done(null, false) ;
	}
};

export default { generateBearerToken, validateBearerToken };
