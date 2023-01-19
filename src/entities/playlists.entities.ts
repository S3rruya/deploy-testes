import { hashSync } from "bcryptjs"
import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, UpdateDateColumn} from "typeorm";
import { Musics } from "./musics.entities";
//import { PlaylistsToMusics } from "./playlists_musics.entities";
import { Users } from "./users.entities";

@Entity("playlists")
class Playlists{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 80})
    name: string

    @Column({ type:"time", default:"00:00:00" })
    duration: string

    @Column({ default: true})
    isActive: boolean
    
    @ManyToOne(() => Users, users => users.playlists)
    user: Users
    
    @ManyToMany(()=> Musics, musics => musics.playlists)
    @JoinTable({
        name: "musicsToPlaylists"
    })
    musics: Musics[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

export {Playlists};