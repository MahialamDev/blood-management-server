#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/182ef907f42e732eaf069c428a70bf6d85fd53fa3d168dc2517fd924e9b590a9/contract';
import startContract from '../../snapshots/182ef907f42e732eaf069c428a70bf6d85fd53fa3d168dc2517fd924e9b590a9/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/859931baa68f9ffc708ae2d67b72dd55a8a1c88f2e79da4bea2ffc0845ae5ec8/contract';
import endContract from '../../snapshots/859931baa68f9ffc708ae2d67b72dd55a8a1c88f2e79da4bea2ffc0845ae5ec8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
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
