import 'dotenv/config';
import jwt from 'jsonwebtoken';

const generateToken = (user_id: string) => {
    
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    })
    console.log(token, "token");
    
    return token;
}

export default generateToken;
