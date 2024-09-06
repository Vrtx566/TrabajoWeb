import { PartialType } from '@nestjs/mapped-types';
import { CreateGarantiaSeguridadCalidadDto } from './create-garantia.dto';

export class UpdateGarantiaDto extends PartialType(CreateGarantiaSeguridadCalidadDto) {}
