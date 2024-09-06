
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Cliente} from "../../clientes/entities/cliente.entity";

@Entity('Servicios_Adicionales')
export class ServicioAdicional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    descripcion: string;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @Column({ type: 'date' })
    fecha: Date;
}