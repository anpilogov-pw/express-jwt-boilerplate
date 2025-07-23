export interface ICrudService<T, ID = number> {
  /**
   * Получить все записи (опционально с пагинацией/фильтрацией).
   */
  findAll(): Promise<T[]>;

  /**
   * Получить запись по идентификатору.
   * @param id Идентификатор сущности
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Создать новую запись.
   * @param data Данные для создания сущности
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Обновить существующую запись.
   * @param id Идентификатор сущности
   * @param data Данные для обновления
   */
  update(id: ID, data: Partial<T>): Promise<T>;

  /**
   * Удалить запись по идентификатору.
   * @param id Идентификатор сущности
   */
  delete(id: ID): Promise<void>;
}
