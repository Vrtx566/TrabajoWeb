import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDecimal, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateOrganoDto {
    @ApiProperty({
        description: 'Unique identifier for the organ',
        example: 'b7b9d2e5-6f4a-4c7b-9b71-6d053e5e8b78',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Type of the organ',
        example: 'Heart',
    })
    @IsString()
    tipo: string;

    @ApiProperty({
        description: 'Price of the organ',
        example: 2500.00,
    })
    @IsDecimal()
    precio: number;

    @ApiProperty({
        description: 'Availability of the organ',
        example: true,
    })
    @IsBoolean()
    disponibilidad: boolean;

    @ApiProperty({
        description: 'ID of the provider associated with the organ',
        example: 'f2a0b4d6-9e8b-4c7a-9d51-8b65b7d347f1',
    })
    @IsUUID()
    proveedor_id: string;
}
