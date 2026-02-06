import prisma from "../database/dbConfig.js";

class User {
  static async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }
  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, email: true, chat_id: true },
    });
  }

  static async update(id, userData) {
    return prisma.user.update({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        chat_id: true,
        email: true,
        created_at: true,
      },
      data: userData,
    });
  }
}

export default User;
