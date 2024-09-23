import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProveedorDto {
    @ApiProperty({
        description: 'Unique identifier for the provider',
        example: 'b7b9d2e5-6f4a-4c7b-9b71-6d053e5e8b78',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Name of the provider',
        example: 'Acme Supplies',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Contact information for the provider',
        example: '+1234567890',
    })
    @IsString()
    contacto: string;

    @ApiProperty({
        description: 'Location of the provider',
        example: '456 Elm St, Metropolis, USA',
    })
    @IsString()
    ubicacion: string;
}
