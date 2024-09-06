import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganosService } from './organos.service';
import { OrganosController } from './organos.controller';
import { Organo } from './entities/organo.entity';
import { Proveedor } from '../proveedores/entities/proveedore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organo, Proveedor])],
  controllers: [OrganosController],
  providers: [OrganosService],
})
export class OrganosModule {}