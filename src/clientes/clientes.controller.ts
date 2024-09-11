import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ClientesService} from './clientes.service';
import {CreateClienteDto} from './dto/create-cliente.dto';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {UseRoleGuard} from "../use-role/use-role.guard";
import {Role} from "../enums/role.enum";
import {Roles} from "../auth/decorators/roles.decorator";
import {JwtAuthGuard} from "../auth/guard/jwtAuthGuard";

//solo rol cliente puede acceder a este controlador


@Roles(Role.USER)
@UseGuards(UseRoleGuard)
@Controller('clientes')

export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }


  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }
}