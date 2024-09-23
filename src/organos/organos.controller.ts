import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrganosService } from './organos.service';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';

@ApiTags('organos')
@Controller('organos')
export class OrganosController {
  constructor(private readonly organosService: OrganosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organ' })
  @ApiResponse({ status: 201, description: 'The organ has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateOrganoDto })
  create(@Body() createOrganoDto: CreateOrganoDto) {
    return this.organosService.create(createOrganoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all organs' })
  @ApiResponse({ status: 200, description: 'Return all organs.' })
  @ApiResponse({ status: 404, description: 'No organs found.' })
  findAll() {
    return this.organosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single organ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the organ' })
  @ApiResponse({ status: 200, description: 'Return the organ.' })
  @ApiResponse({ status: 404, description: 'Organ not found.' })
  findOne(@Param('id') id: string) {
    return this.organosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the organ to be updated' })
  @ApiBody({ type: UpdateOrganoDto })
  @ApiResponse({ status: 200, description: 'The organ has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Organ not found.' })
  update(@Param('id') id: string, @Body() updateOrganoDto: UpdateOrganoDto) {
    return this.organosService.update(id, updateOrganoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the organ to be deleted' })
  @ApiResponse({ status: 200, description: 'The organ has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Organ not found.' })
  remove(@Param('id') id: string) {
    return this.organosService.remove(id);
  }
}
