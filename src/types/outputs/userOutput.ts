// Estrutura para o retorno ao buscar um usuário
export interface UserOutput {
  id: number;
  name: string;
  email: string;
}

// Estrutura para o retorno ao autenticar
export interface AuthenticateUserOutput {
  token: string;
  user: UserOutput;
}