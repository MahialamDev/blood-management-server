#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract';
import endContract from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/859931baa68f9ffc708ae2d67b72dd55a8a1c88f2e79da4bea2ffc0845ae5ec8/contract';
import startContract from '../../snapshots/859931baa68f9ffc708ae2d67b72dd55a8a1c88f2e79da4bea2ffc0845ae5ec8/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'user', column: 'address' }),
      this.createTable({
        schema: 'public',
        table: 'price',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
