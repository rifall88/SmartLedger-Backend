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
  static async update(id, userData) {
    return prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
  }
}

export default User;
