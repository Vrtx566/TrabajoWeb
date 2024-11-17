import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProveedoresModule} from './proveedores/proveedores.module';
import {ClientesModule} from './clientes/clientes.module';
import {OrganosModule} from './organos/organos.module';
import {GarantiaModule} from './garantia/garantia.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {SeedModule} from "./seed/seed.module";




@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: { rejectUnauthorized: false }
        }),
        ProveedoresModule,
        ClientesModule,
        OrganosModule,
        GarantiaModule,
        AuthModule,
        SeedModule

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}