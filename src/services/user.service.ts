import { PrismaClient } from "@prisma/client";
import { BaseService } from './base.service';
import { TUser } from 'UserType';

export class UserService extends BaseService<TUser> {
  protected model: PrismaClient['users'];

  constructor(prisma?: PrismaClient) {
    super(prisma);
    this.model = this.prisma.users;
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error('findByEmail error handled: ', error);
      return null;
    }
  }
}
