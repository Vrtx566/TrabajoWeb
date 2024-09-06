import { IsUUID, IsString, IsDate } from 'class-validator';
import {PrimaryGeneratedColumn} from "typeorm";

export class CreateServicioAdicionalDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    descripcion: string;

    @IsUUID()
    cliente_id: string;

    @IsDate()
    fecha: Date;
}