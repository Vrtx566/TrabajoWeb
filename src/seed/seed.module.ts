// src/seed/seed.module.ts

import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Organo } from '../organos/entities/organo.entity';
import { GarantiaSeguridadCalidad } from '../garantia/entities/garantia.entity';
import { Proveedor } from '../proveedores/entities/proveedore.entity';
import { User } from '../auth/entities/auth.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cliente, Organo, GarantiaSeguridadCalidad, Proveedor, User]),
    ],
    providers: [SeedService],
    controllers: [SeedController],
})
export class SeedModule {}