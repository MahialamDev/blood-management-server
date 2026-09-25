#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract';
import startContract from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/def21a7d0aea1a88fd34b9e8b18dd2a5efb35e303651f2e46af03990d4c76b14/contract';
import endContract from '../../snapshots/def21a7d0aea1a88fd34b9e8b18dd2a5efb35e303651f2e46af03990d4c76b14/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'price' }),
      this.dropTable({ schema: 'public', table: 'product' }),
      this.setDefault({
        schema: 'public',
        table: 'user',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
