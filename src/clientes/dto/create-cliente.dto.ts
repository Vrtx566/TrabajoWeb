import {IsNotEmpty, IsString} from 'class-validator';

export class CreateClienteDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    contacto: string;

    @IsString()
    @IsNotEmpty()
    ubicacion: string;


}