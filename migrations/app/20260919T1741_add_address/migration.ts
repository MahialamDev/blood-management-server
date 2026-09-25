#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/8f656994abeb75d8302ae930162e74f6d7940054f645261c540e6107628b99c1/contract';
import endContract from '../../snapshots/8f656994abeb75d8302ae930162e74f6d7940054f645261c540e6107628b99c1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a5950ee47c87c0b43f8d2decc6d87a07e01b8d29d1d2eae0466118906a4835d3/contract';
import startContract from '../../snapshots/a5950ee47c87c0b43f8d2decc6d87a07e01b8d29d1d2eae0466118906a4835d3/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
