// Dados esperados para criar um usuário
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

// Dados esperados para autenticação
export interface AuthenticateUserInput {
  email: string;
  password: string;
}