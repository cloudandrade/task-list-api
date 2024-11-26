import User from '#models/User'; 

class UserRepository {
  // Método para criar um novo usuário
  public async createUser(userData: { name: string; email: string; password: string }) {
    return await User.create(userData);
  }

  // Método para buscar usuário por email
  public async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  // Método para editar um usuário (possível editar apenas alguns campos)
  public async updateUser(id: number, fieldsToUpdate: Partial<{ name: string; email: string; password: string }>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user.update(fieldsToUpdate);
  }

  // Método para excluir um usuário
  public async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user.destroy();
  }

  // Método para listar todos os usuários (opcional)
  public async getAllUsers() {
    return await User.findAll();
  }
}

export default new UserRepository();
