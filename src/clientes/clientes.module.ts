import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientesService} from './clientes.service';
import {ClientesController} from './clientes.controller';
import {Cliente} from './entities/cliente.entity';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cliente]),
        JwtModule.register({
            secret: 'AGUAPANELA',
            signOptions: {expiresIn: '1d'},
        }),
        AuthModule,
    ],
    controllers: [ClientesController],
    providers: [ClientesService],
})
export class ClientesModule {
}