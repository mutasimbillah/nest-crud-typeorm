import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('all')
  async getAll(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Post('add')
  @HttpCode(201)
  createEmployee(@Body() newEmployee: any) {
    this.employeeService.create(newEmployee);
    console.log('emp added');
  }

  @Post('update')
  @HttpCode(200)
  updateEmployee(@Body() employeeToUpdate: any) {
    this.employeeService.update(employeeToUpdate);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  deleteEmployee(@Param('id') id) {
    this.employeeService.delete(id);
  }
}
