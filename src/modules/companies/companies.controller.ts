import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      const createCompany = await this.companiesService.create(createCompanyDto);
      return createCompany;
    } catch (error) {
      throw new NotFoundException('No se pudo crear la empresa');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const companies = await this.companiesService.findAll();
      return companies;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener las empresas',
      )
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    try {
      const company = await this.companiesService.findOne(+id);
      return company;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al obtener la empresa');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    try {
      const updateCompany = await this.companiesService.update(+id, updateCompanyDto);
      return updateCompany;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al actualizar la empresa');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async inativate(@Param('id') id: number) {
    try {
      return await this.companiesService.inativate(+id);
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al inactivar la empresa');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      return await this.companiesService.remove(+id);
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al eliminar la empresa');
    }
  }
}
