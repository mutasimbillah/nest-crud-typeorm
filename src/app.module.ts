import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee } from './Employee/employee.entity';
import { EmployeeModule } from './Employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-nest-crud',
      port: 5432,
      username: 'billah',
      password: '@mutasim321',
      database: 'nestcrud',
      synchronize: true,
      entities: [Employee],
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
