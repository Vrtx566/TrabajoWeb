import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProveedoresService} from './proveedores.service';
import {ProveedoresController} from './proveedores.controller';
import {Proveedor} from './entities/proveedore.entity';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Proveedor]),
        JwtModule.register({
            secret: 'AGUAPANELA',
            signOptions: {expiresIn: '1d'},
        }),
        AuthModule,
    ],
    controllers: [ProveedoresController],
    providers: [ProveedoresService],
})
export class ProveedoresModule {
}