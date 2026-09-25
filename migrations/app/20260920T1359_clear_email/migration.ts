#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract';
import endContract from '../../snapshots/0273bfd2a45a41e361915ad48bbd243849ccab937abe2d9d049ded56d2d33f04/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/def21a7d0aea1a88fd34b9e8b18dd2a5efb35e303651f2e46af03990d4c76b14/contract';
import startContract from '../../snapshots/def21a7d0aea1a88fd34b9e8b18dd2a5efb35e303651f2e46af03990d4c76b14/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
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
