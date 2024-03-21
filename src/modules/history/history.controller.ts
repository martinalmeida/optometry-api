import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/history.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    try {
      const users = await this.historyService.getAllHistorys();
      if (!users) throw new NotFoundException('No se encontraron historias');
      return users;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener las historias clínicas',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    try {
      const userFound = await this.historyService.getHistoryById(Number(id));
      if (!userFound)
        throw new NotFoundException('No se encontro la historia clínica');
      return userFound;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error al obtener la historia clínica',
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() data: HistoryDto) {
    try {
      const user = await this.historyService.createHistory(data);
      return user;
    } catch (error) {
      throw new NotFoundException('No se pudo crear la historia clínica');
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() data: HistoryDto) {
    try {
      const updatedUser = await this.historyService.updateHistory(id, data);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar la historia clínica');
    }
  }

  @Patch('inactivate/:id')
  @UseGuards(JwtAuthGuard)
  async inactivateHistory(@Param('id') id: number) {
    try {
      return await this.historyService.inactivateHistory(+id);
    } catch (error) {
      throw new NotFoundException('No se pudo inactivar la historia clínica');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.historyService.deleteHistory(Number(id));
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar la historia clínica');
    }
  }
}
