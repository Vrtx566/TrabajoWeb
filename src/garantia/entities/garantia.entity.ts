import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Proveedor} from "../../proveedores/entities/proveedore.entity";
import { Organo} from "../../organos/entities/organo.entity";

@Entity('Garantía_Seguridad_Calidad')
export class GarantiaSeguridadCalidad {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    descripcion: string;

    @ManyToOne(() => Organo)
    @JoinColumn({ name: 'organ_id' })
    organo: Organo;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor: Proveedor;

    @Column({ type: 'varchar', length: 255 })
    certificado: string;
}