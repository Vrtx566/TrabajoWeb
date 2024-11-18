import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-dto';
import {Check} from "typeorm";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new authentication record' })
  @ApiResponse({ status: 201, description: 'The authentication record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateAuthDto })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authentication records' })
  @ApiResponse({ status: 200, description: 'Return all authentication records.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  findAll() {
    return this.authService.findAll();
  }

  @Get('check/:token')
    @ApiOperation({ summary: 'Check if a token is valid' })
    @ApiParam({ name: 'token', type: String, description: 'Token to be checked' })
    @ApiResponse({ status: 200, description: 'Token is valid.' })
    @ApiResponse({ status: 401, description: 'Token is invalid.' })
  check(@Param('token') token: string) {
    return this.authService.checkToken(token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single authentication record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the authentication record' })
  @ApiResponse({ status: 200, description: 'Return the authentication record.' })
  @ApiResponse({ status: 404, description: 'Authentication record not found.' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an authentication record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the authentication record to be updated' })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'The authentication record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Authentication record not found.' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an authentication record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the authentication record to be deleted' })
  @ApiResponse({ status: 200, description: 'The authentication record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Authentication record not found.' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with authentication details' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
