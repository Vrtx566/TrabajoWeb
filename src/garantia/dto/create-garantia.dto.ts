import { IsUUID, IsString } from 'class-validator';
import {PrimaryGeneratedColumn} from "typeorm";

export class CreateGarantiaSeguridadCalidadDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    organ_id: string;

    @IsUUID()
    proveedor_id: string;

    @IsString()
    certificado: string;
}