#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a5950ee47c87c0b43f8d2decc6d87a07e01b8d29d1d2eae0466118906a4835d3/contract';
import endContract from '../../snapshots/a5950ee47c87c0b43f8d2decc6d87a07e01b8d29d1d2eae0466118906a4835d3/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('imageUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('User'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_role_check_5a42eb1c',
            "\"role\" IN ('User', 'Admin', 'Super_Admin')",
          ),
        ],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
