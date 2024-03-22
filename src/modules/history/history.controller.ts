import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, UseGuards, Patch, } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/history.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: HistoryDto) {
    try {
      const user = await this.historyService.create(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear la historia clínica');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const users = await this.historyService.findAll();
      return users;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener las historias clínicas',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    try {
      const userFound = await this.historyService.findOne(+id);
      return userFound;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error al obtener la historia clínica',);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() data: HistoryDto) {
    try {
      const updatedUser = await this.historyService.update(+id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar la historia clínica');
    }
  }

  @Patch('inactivate/:id')
  @UseGuards(JwtAuthGuard)
  async inativate(@Param('id') id: number) {
    try {
      return await this.historyService.inativate(+id);
    } catch (error) {
      throw new NotFoundException('No se pudo inactivar la historia clínica');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.historyService.remove(+id);
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar la historia clínica');
    }
  }
}
