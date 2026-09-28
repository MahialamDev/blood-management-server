#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3c0fc9338f0dad3efb174e052d01cc95fbb82f5409e93bf43d053cc051c1aba7/contract';
import startContract from '../../snapshots/3c0fc9338f0dad3efb174e052d01cc95fbb82f5409e93bf43d053cc051c1aba7/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/b998490b003e4356554e1d65ef446364481ca66968bf61e149964fda7e8485e7/contract';
import endContract from '../../snapshots/b998490b003e4356554e1d65ef446364481ca66968bf61e149964fda7e8485e7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('accountStatus', 'text', {
          notNull: true,
          default: lit('Pending'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('verified', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'user',
        constraint: 'user_accountStatus_check_7a70b409',
        expression: "\"accountStatus\" IN ('Pending', 'Active', 'Blocked', 'Suspended', 'Deleted')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
