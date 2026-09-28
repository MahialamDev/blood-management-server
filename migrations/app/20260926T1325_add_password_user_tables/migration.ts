#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract';
import startContract from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/3c0fc9338f0dad3efb174e052d01cc95fbb82f5409e93bf43d053cc051c1aba7/contract';
import endContract from '../../snapshots/3c0fc9338f0dad3efb174e052d01cc95fbb82f5409e93bf43d053cc051c1aba7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', {
          notNull: true,
          default: lit('password'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
