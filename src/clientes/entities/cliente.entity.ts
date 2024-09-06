import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clientes')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    contacto: string;

    @Column({ type: 'varchar', length: 100 })
    ubicacion: string;

    @Column({ type: 'jsonb' })
    historico_compras: object;
}