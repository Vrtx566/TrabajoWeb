import { MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Role} from "nest-access-control";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column('text',{unique:true})
    @MinLength(4)
    email:string;
    @Column('text')
    alias:string;
    @Column('text')
    @MinLength(8)
    password:string;
    @Column('boolean',{default:true})
    isActive:boolean;
    @Column('text',{array:true,
    default:['user']
    })
    @MinLength(1)
    roles:string[];


}
