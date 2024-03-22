import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) { }
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { name, nit, email, phone } = createCompanyDto;
      const data = { name, nit, email, phone, created: new Date() };
      const createCompany = await this.prisma.companies.create({ data });
      if (!createCompany) { throw new Error('No se pudo crear la empresa'); }
      return { createCompany: createCompany };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(): Promise<object> {
    try {
      const companies = await this.prisma.companies.findMany();
      if (!companies || companies.length === 0) { return { message: 'No se encontraron empresas. 🏢' } }
      return { companies: companies };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.prisma.companies.findUnique({ where: { id, deleted: null, }, });
      if (!company) { return { message: `La empresa con ID ${id} no fue encontrada. ☣️` } }
      return { company: company };
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const { name, nit, email, phone } = updateCompanyDto;
      const data = { name, nit, email, phone, updated: new Date() };
      const updatedCompany = await this.prisma.companies.update({ where: { id }, data });
      if (!updatedCompany) { throw new Error(`La empresa con ID ${id} no pudo ser actualizada. ☣️`); }
      return { updatedCompany: updatedCompany };
    } catch (error) {
      return { error: error.message };
    }
  }

  async inativate(id: number) {
    try {
      const company = await this.prisma.companies.findUnique({ where: { id }, });
      if (!company) { return { message: `La empresa con ID ${id} no fue encontrada. ☣️` }; }
      const newStatus = !company.status;
      company.status = newStatus;
      company.updated = new Date();
      const inativateCompany = await this.prisma.companies.update({ where: { id }, data: company });
      if (!inativateCompany) { throw new Error(`La empresa con ID ${id} no pudo ser inactivada. ☣️`); }
      return { message: `La empresa con ID ${id} fue inactivada. ☣️` };
    } catch (error) {
      return { error: error.message };
    }
  }

  async remove(id: number) {
    try {
      const company = await this.prisma.companies.findUnique({ where: { id }, });
      if (!company) { throw new Error(`La empresa con ID ${id} no fue encontrada. ☣️`); }
      // const deletedCompany = await this.prisma.companies.update({ where: { id }, data: { deleted: new Date() } });
      // if (!deletedCompany) { throw new Error(`La empresa con ID ${id} no pudo ser eliminada. ☣️`); }
      return { message: `La empresa con ID ${id} fue eliminada. ☣️` };
    } catch (error) {
      return { error: error.message };
    }
  }
}
