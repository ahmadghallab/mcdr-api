import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ReorderService {
  constructor(private readonly dataSource: DataSource) {}

  async reorder<T extends { id: number; order: number }>(
    repo: Repository<T>,
    items: { id: number; order: number }[],
  ): Promise<void> {
    if (!items.length) return;

    const tableName = repo.metadata.tableName;

    const ids = items.map(i => i.id).join(',');
    const cases = items.map(i => `WHEN ${i.id} THEN ${i.order}`).join(' ');

    try {
      const query = `
        UPDATE ${tableName}
        SET \`order\` = CASE id
          ${cases}
        END
        WHERE id IN (${ids});
      `;
  
      await this.dataSource.query(query);
    } catch (error) {
      throw new BadRequestException(`Failed to reorder entities: ${error.message}`);
    }
  }
}
