// proveedores/entities/proveedore.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Organo } from '../../organos/entities/organo.entity';

@Entity('Proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    contacto: string;

    @Column({ type: 'varchar', length: 100 })
    ubicacion: string;

    @Column({ type: 'decimal', default: 0 })
    rating: number;

    @Column({ type: 'int', default: 0 })
    organos_proveidos: number;

    @OneToMany(() => Organo, organo => organo.proveedor)
    organos: Organo[];
}