import { PrismaClient } from "@prisma/client";
import { ICrudService } from '../interfaces';

export abstract class BaseService<T, ID = number> implements ICrudService<T, ID> {
  protected prisma: PrismaClient;
  protected abstract model: any;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: ID): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create({
      data,
    });
  }

  async update(id: ID, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: ID): Promise<void> {
    await this.model.delete({
      where: { id },
    });
  }
}
