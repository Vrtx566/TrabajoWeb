import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ProveedoresService} from './proveedores.service';
import {CreateProveedorDto} from './dto/create-proveedore.dto';
import {UpdateProveedoreDto} from './dto/update-proveedore.dto';
import {UseRoleGuard} from "../use-role/use-role.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../enums/role.enum";

@Roles(Role.PROVIDER)
@UseGuards(UseRoleGuard)
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedoreDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
