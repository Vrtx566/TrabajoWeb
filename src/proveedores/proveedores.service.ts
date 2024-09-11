import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Proveedor} from "./entities/proveedore.entity";
import {CreateProveedorDto} from "./dto/create-proveedore.dto";
import {UpdateProveedoreDto} from "./dto/update-proveedore.dto";

@Injectable()
export class ProveedoresService {
    constructor(
        @InjectRepository(Proveedor)
        private proveedoresRepository: Repository<Proveedor>,
    ) {
    }

    async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
        const proveedor = new Proveedor();
        Object.assign(proveedor, createProveedorDto);

        // Initialize 'rating' and 'organos_proveidos' with default values
        proveedor.organos_proveidos = 0;
        proveedor.organos = [];

        return await this.proveedoresRepository.save(proveedor);
    }

    findAll(): Promise<Proveedor[]> {
        return this.proveedoresRepository.find({relations: ['organos']});
    }

    async findOne(id: string): Promise<Proveedor> {
        const proveedor = await this.proveedoresRepository.findOne({where: {id}});
        if (!proveedor) {
            throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }
        return proveedor;
    }

    async update(id: string, updateProveedorDto: UpdateProveedoreDto): Promise<Proveedor> {
        const proveedor = await this.proveedoresRepository.findOne({where: {id}});

        Object.assign(proveedor, updateProveedorDto);
        return this.proveedoresRepository.save(proveedor);
    }

    async remove(id: string): Promise<void> {
        const proveedor = await this.proveedoresRepository.findOne({where: {id}});

        await this.proveedoresRepository.remove(proveedor);
    }
}