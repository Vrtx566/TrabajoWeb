import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { GarantiaService } from './garantia.service';
import { CreateGarantiaSeguridadCalidadDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@ApiTags('garantia')
@Controller('garantia')
export class GarantiaController {
  constructor(private readonly garantiaService: GarantiaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new guarantee' })
  @ApiResponse({ status: 201, description: 'The guarantee has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateGarantiaSeguridadCalidadDto })
  create(@Body() createGarantiaDto: CreateGarantiaSeguridadCalidadDto) {
    return this.garantiaService.create(createGarantiaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all guarantees' })
  @ApiResponse({ status: 200, description: 'Return all guarantees.' })
  @ApiResponse({ status: 404, description: 'No guarantees found.' })
  findAll() {
    return this.garantiaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single guarantee by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the guarantee' })
  @ApiResponse({ status: 200, description: 'Return the guarantee.' })
  @ApiResponse({ status: 404, description: 'Guarantee not found.' })
  findOne(@Param('id') id: string) {
    return this.garantiaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a guarantee by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the guarantee to be updated' })
  @ApiBody({ type: UpdateGarantiaDto })
  @ApiResponse({ status: 200, description: 'The guarantee has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Guarantee not found.' })
  update(@Param('id') id: string, @Body() updateGarantiaDto: UpdateGarantiaDto) {
    return this.garantiaService.update(id, updateGarantiaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guarantee by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the guarantee to be deleted' })
  @ApiResponse({ status: 200, description: 'The guarantee has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Guarantee not found.' })
  remove(@Param('id') id: string) {
    return this.garantiaService.remove(id);
  }
}
