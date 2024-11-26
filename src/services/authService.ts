import UserRepository from '#repositories/userRepository';
import { AuthenticateUserInput } from '#types/inputs/userInput';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = '4h';

// Gera um token JWT
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): number | null => {
  const secret = process.env.JWT_SECRET || 'your_secret_key';

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, secret);
    
    // Se o token for válido, retorna o userId
    if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
      return decoded.userId as number;
    }
    
    // Se o token não contiver um userId válido, retorna null
    return null;
  } catch (error) {
    // Caso o token seja inválido ou qualquer erro ocorra, retorna null
    return null;
  }
};

export const authenticateUser = async (credentials: AuthenticateUserInput): Promise<string | null> => {
  const user = await UserRepository.getUserByEmail(credentials.email);
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    return null;
  }

  return generateToken(user.id);
};

