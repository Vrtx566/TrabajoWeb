import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateGarantiaSeguridadCalidadDto {
    @ApiProperty({
        description: 'Unique identifier for the guarantee',
        example: 'b7b9d2e5-6f4a-4c7b-9b71-6d053e5e8b78',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Description of the guarantee',
        example: 'High quality assurance for product X',
    })
    @IsString()
    descripcion: string;

    @ApiProperty({
        description: 'ID of the organ associated with the guarantee',
        example: 'a4b0c0d1-1e2f-4c3d-9b80-7d95d3a045b6',
    })
    @IsUUID()
    organ_id: string;

    @ApiProperty({
        description: 'ID of the provider associated with the guarantee',
        example: 'f2a0b4d6-9e8b-4c7a-9d51-8b65b7d347f1',
    })
    @IsUUID()
    proveedor_id: string;

    @ApiProperty({
        description: 'Certificate of the guarantee',
        example: 'CERT-123456789',
    })
    @IsString()
    certificado: string;
}
