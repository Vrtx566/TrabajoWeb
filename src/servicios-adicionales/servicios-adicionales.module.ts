import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosAdicionalesService } from './servicios-adicionales.service';
import { ServiciosAdicionalesController } from './servicios-adicionales.controller';
import { ServicioAdicional } from './entities/servicios-adicionale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioAdicional])],
  controllers: [ServiciosAdicionalesController],
  providers: [ServiciosAdicionalesService],
})
export class ServiciosAdicionalesModule {}