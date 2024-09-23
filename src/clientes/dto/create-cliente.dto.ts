import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {

    @ApiProperty({
        description: 'The name of the client',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'The contact information of the client',
        example: '+1234567890',
    })
    @IsString()
    @IsNotEmpty()
    contacto: string;

    @ApiProperty({
        description: 'The location of the client',
        example: '123 Main St, Anytown, USA',
    })
    @IsString()
    @IsNotEmpty()
    ubicacion: string;
}
