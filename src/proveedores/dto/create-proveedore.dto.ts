import { IsUUID, IsString, IsDecimal, IsInt } from 'class-validator';
import {PrimaryGeneratedColumn} from "typeorm";

export class CreateProveedorDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    nombre: string;

    @IsString()
    contacto: string;

    @IsString()
    ubicacion: string;

}