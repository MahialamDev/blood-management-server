#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract';
import endContract from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract';
import startContract from '../../snapshots/64bb43acf713ab8c80065b28645874c745e2dfb6c615e110b5aa7ac40ae4b31f/contract.json' with { type: 'json' };
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
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
