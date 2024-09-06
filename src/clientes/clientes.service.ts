// src/clientes/clientes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
      @InjectRepository(Cliente)
      private clientesRepository: Repository<Cliente>,
  ) {}

  // Crear un nuevo cliente
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new Cliente();
    Object.assign(cliente, createClienteDto);

    // Initialize 'historico_compras' as an empty array or object
    cliente.historico_compras = [];

    return await this.clientesRepository.save(cliente);
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return await this.clientesRepository.find();
  }

  // Obtener un cliente por ID
  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  // Actualizar un cliente
  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.clientesRepository.save(cliente);
  }

  // Eliminar un cliente
  async remove(id: string): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clientesRepository.remove(cliente);
  }
}