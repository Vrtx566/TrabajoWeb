import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarantiaSeguridadCalidad } from './entities/garantia.entity';
import { CreateGarantiaSeguridadCalidadDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@Injectable()
export class GarantiaService {
  constructor(
      @InjectRepository(GarantiaSeguridadCalidad)
      private garantiaRepository: Repository<GarantiaSeguridadCalidad>,
  ) {}

  async create(createGarantiaDto: CreateGarantiaSeguridadCalidadDto): Promise<GarantiaSeguridadCalidad> {
    const garantia = this.garantiaRepository.create(createGarantiaDto);
    return this.garantiaRepository.save(garantia);
  }

  findAll(): Promise<GarantiaSeguridadCalidad[]> {
    return this.garantiaRepository.find();
  }

  async findOne(id: string): Promise<GarantiaSeguridadCalidad> {
    const garantia = await this.garantiaRepository.findOne({ where: { id: id } });
    if (!garantia) {
      throw new NotFoundException(`Garantia con ID ${id} no encontrada`);
    }
    return garantia;
  }

  async update(id: string, updateGarantiaDto: UpdateGarantiaDto): Promise<GarantiaSeguridadCalidad> {
    const garantia = await this.garantiaRepository.findOne({ where: { id: id } });
    Object.assign(garantia, updateGarantiaDto);
    return this.garantiaRepository.save(garantia);
  }

  async remove(id: string): Promise<void> {
    const garantia = await this.garantiaRepository.findOne({ where: { id: id } });
    await this.garantiaRepository.remove(garantia);
  }
}