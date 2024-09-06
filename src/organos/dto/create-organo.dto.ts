// organos/dto/create-organo.dto.ts

import { IsUUID, IsString, IsDecimal, IsBoolean } from 'class-validator';
import {PrimaryGeneratedColumn} from "typeorm";

export class CreateOrganoDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    tipo: string;

    @IsDecimal()
    precio: number;

    @IsBoolean()
    disponibilidad: boolean;

    @IsUUID()
    proveedor_id: string;
}