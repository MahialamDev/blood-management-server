#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/182ef907f42e732eaf069c428a70bf6d85fd53fa3d168dc2517fd924e9b590a9/contract';
import endContract from '../../snapshots/182ef907f42e732eaf069c428a70bf6d85fd53fa3d168dc2517fd924e9b590a9/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/8f656994abeb75d8302ae930162e74f6d7940054f645261c540e6107628b99c1/contract';
import startContract from '../../snapshots/8f656994abeb75d8302ae930162e74f6d7940054f645261c540e6107628b99c1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'user' }),
      this.createTable({
        schema: 'public',
        table: 'product',
        columns: [
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
