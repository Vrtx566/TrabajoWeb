import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioAdicionalDto } from './create-servicios-adicionale.dto';

export class UpdateServiciosAdicionaleDto extends PartialType(CreateServicioAdicionalDto) {}
