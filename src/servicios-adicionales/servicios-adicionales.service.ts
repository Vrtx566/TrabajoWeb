import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioAdicional} from "./entities/servicios-adicionale.entity";
import { CreateServicioAdicionalDto} from "./dto/create-servicios-adicionale.dto";
import { UpdateServiciosAdicionaleDto } from './dto/update-servicios-adicionale.dto';

@Injectable()
export class ServiciosAdicionalesService {
  constructor(
      @InjectRepository(ServicioAdicional)
      private serviciosAdicionalesRepository: Repository<ServicioAdicional>,
  ) {}

  async create(createServiciosAdicionaleDto: CreateServicioAdicionalDto): Promise<ServicioAdicional> {
    const servicioAdicional = this.serviciosAdicionalesRepository.create(createServiciosAdicionaleDto);
    return this.serviciosAdicionalesRepository.save(servicioAdicional);
  }

  findAll(): Promise<ServicioAdicional[]> {
    return this.serviciosAdicionalesRepository.find();
  }

  async findOne(id: string): Promise<ServicioAdicional> {
    const servicioAdicional = await this.serviciosAdicionalesRepository.findOne({ where: { id } });
    if (!servicioAdicional) {
      throw new NotFoundException(`Servicio Adicional con ID ${id} no encontrado`);
    }
    return servicioAdicional;
  }

  async update(id: string, updateServiciosAdicionaleDto: UpdateServiciosAdicionaleDto): Promise<ServicioAdicional> {
    const servicioAdicional = await this.serviciosAdicionalesRepository.findOne({ where: { id } });

    Object.assign(servicioAdicional, updateServiciosAdicionaleDto);
    return this.serviciosAdicionalesRepository.save(servicioAdicional);
  }

  async remove(id: string): Promise<void> {
    const servicioAdicional = await this.serviciosAdicionalesRepository.findOne({ where: { id } });

    await this.serviciosAdicionalesRepository.remove(servicioAdicional);
  }
}