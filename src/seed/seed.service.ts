// src/seed/seed.service.ts

import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Cliente} from '../clientes/entities/cliente.entity';
import {Proveedor} from '../proveedores/entities/proveedore.entity';
import {User} from '../auth/entities/auth.entity';
import {Organo} from "../organos/entities/organo.entity";
import {usuariosData} from "./data/auth.json";
import {clientesData} from "./data/clientes.json";
import {proveedoresData} from "./data/proveedores.json";
import {organosData} from "./data/organos.json";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        @InjectRepository(Cliente)
        private clientesRepository: Repository<Cliente>,
        @InjectRepository(Proveedor)
        private proveedoresRepository: Repository<Proveedor>,
        @InjectRepository(Organo)
        private organosRepository: Repository<Organo>,
    ) {
    }

    async seedDatabase() {
        const usersEncrypted = usuariosData.map((user) => {
                const hashedPassword = bcrypt.hashSync(user.password, 10);
                return {...user, password: hashedPassword};
            }
        );

        await this.authRepository.save(usersEncrypted);
        await this.clientesRepository.save(clientesData);
        await this.proveedoresRepository.save(proveedoresData);

        const organosEntities = organosData.map(organo => {
            const proveedor = proveedoresData.find(p => p.id === organo.proveedor_id);
            return {...organo, proveedor};
        });

        await this.organosRepository.save(organosEntities);
    }
}