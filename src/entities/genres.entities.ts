import { Entity,PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import { Musics } from "./musics.entities";

@Entity("genres")
class Genres{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 100})
    name: string

    @OneToMany(() => Musics, musics => musics.genre)
    musics: Musics
}

export {Genres};