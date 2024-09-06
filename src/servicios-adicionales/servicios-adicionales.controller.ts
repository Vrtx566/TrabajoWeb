import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosAdicionalesService } from './servicios-adicionales.service';
import { CreateServicioAdicionalDto } from './dto/create-servicios-adicionale.dto';
import { UpdateServiciosAdicionaleDto } from './dto/update-servicios-adicionale.dto';

@Controller('servicios-adicionales')
export class ServiciosAdicionalesController {
  constructor(private readonly serviciosAdicionalesService: ServiciosAdicionalesService) {}

  @Post()
  create(@Body() createServiciosAdicionaleDto: CreateServicioAdicionalDto) {
    return this.serviciosAdicionalesService.create(createServiciosAdicionaleDto);
  }

  @Get()
  findAll() {
    return this.serviciosAdicionalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosAdicionalesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiciosAdicionaleDto: UpdateServiciosAdicionaleDto) {
    return this.serviciosAdicionalesService.update(id, updateServiciosAdicionaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosAdicionalesService.remove(id);
  }
}
