import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarantiaService } from './garantia.service';
import { GarantiaController } from './garantia.controller';
import { GarantiaSeguridadCalidad } from './entities/garantia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GarantiaSeguridadCalidad])],
  controllers: [GarantiaController],
  providers: [GarantiaService],
})
export class GarantiaModule {}