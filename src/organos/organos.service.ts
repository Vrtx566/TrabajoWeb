import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organo } from './entities/organo.entity';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import {Proveedor} from "../proveedores/entities/proveedore.entity";

@Injectable()
export class OrganosService {
    constructor(
        @InjectRepository(Organo)
        private organosRepository: Repository<Organo>,
        @InjectRepository(Proveedor)
        private proveedoresRepository: Repository<Proveedor>,
    ) {}

    async create(createOrganoDto: CreateOrganoDto): Promise<Organo> {
        const proveedor = await this.proveedoresRepository.findOne({
            where: { id: createOrganoDto.proveedor_id },
            relations: ['organos'] // Asegúrate de que 'organos' es el nombre correcto de la relación en tu entidad Proveedor
        });
        if (!proveedor) {
            throw new NotFoundException(`Proveedor con ID ${createOrganoDto.proveedor_id} no encontrado`);
        }

        const organo = new Organo();
        Object.assign(organo, createOrganoDto);

        // Add the organ to the provider's organs
        proveedor.organos.push(organo);

        // Increase the provider's organs_provided counter
        proveedor.organos_proveidos += 1;

        await this.proveedoresRepository.save(proveedor);

        return await this.organosRepository.save(organo);
    }


    findAll(): Promise<Organo[]> {
    return this.organosRepository.find();
    }

  async findOne(id: string): Promise<Organo> {
    const organo = await this.organosRepository.findOne({ where: { id } });
    if (!organo) {
      throw new NotFoundException(`Organo con ID ${id} no encontrado`);
    }
    return organo;
  }

  async update(id: string, updateOrganoDto: UpdateOrganoDto): Promise<Organo> {
    const organo = await this.organosRepository.findOne({ where: { id } });
    Object.assign(organo, updateOrganoDto);
    return this.organosRepository.save(organo);
  }

  async remove(id: string): Promise<void> {
    const organo = await this.organosRepository.findOne({ where: { id } });
    await this.organosRepository.remove(organo);
  }
}