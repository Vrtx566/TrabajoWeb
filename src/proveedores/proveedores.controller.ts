import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { UseRoleGuard } from '../use-role/use-role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiResponse({ status: 201, description: 'The provider has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateProveedorDto })
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all providers' })
  @ApiResponse({ status: 200, description: 'Return all providers.' })
  @ApiResponse({ status: 404, description: 'No providers found.' })
  findAll() {
    return this.proveedoresService.findAll();
  }

  //metodo obtener organos por proveedor
    @Get('organos/:id')
    @ApiOperation({ summary: 'Retrieve all organs by provider' })
    @ApiResponse({ status: 200, description: 'Return all organs by provider.' })
    @ApiResponse({ status: 404, description: 'No organs found.' })
    findOrgansByProvider(@Param('id') id: string) {
        return this.proveedoresService.findOrgansByProvider(id);
    }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single provider by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the provider' })
  @ApiResponse({ status: 200, description: 'Return the provider.' })
  @ApiResponse({ status: 404, description: 'Provider not found.' })
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a provider by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the provider to be updated' })
  @ApiBody({ type: UpdateProveedoreDto })
  @ApiResponse({ status: 200, description: 'The provider has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Provider not found.' })
  update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a provider by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the provider to be deleted' })
  @ApiResponse({ status: 200, description: 'The provider has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Provider not found.' })
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
