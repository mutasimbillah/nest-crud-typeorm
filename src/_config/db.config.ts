import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DefaultNamingStrategy, Table } from 'typeorm';

class EntitySuffixNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    const defaultTableName = targetName
      .replace('Entity', '')
      .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4')
      .toLowerCase();
    return userSpecifiedName ? userSpecifiedName : defaultTableName;
  }
  primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `${table}_${columnsSnakeCase}_pk`;
  }
}

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development' && !process.env.SEED,
    dropSchema:
      false && process.env.NODE_ENV === 'development' && !process.env.SEED,
    namingStrategy: new EntitySuffixNamingStrategy(),
  }),
);
