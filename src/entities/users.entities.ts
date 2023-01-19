import { hashSync } from "bcryptjs";
import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeUpdate, BeforeInsert, JoinColumn, ManyToMany, ManyToOne} from "typeorm";
import { Albums } from "./albuns.entities";
import { Likes } from "./likes.entities";
import { Musics } from "./musics.entities";
import { Playlists } from "./playlists.entities";

@Entity("users")
class Users{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 50})
    name:string

    @Column({length: 150, unique:true})
    email:string

    @Column({length:150})
    password:string

    @Column({default: false})
    isPerformer: boolean

    @Column({default: false})
    isAdmin: boolean

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Playlists, userPlaylist => userPlaylist.user, {nullable:true})
    playlists: Playlists[]

    @OneToMany(() => Musics, musics => musics.performer)
    musics: Musics[]

    @ManyToMany(() => Musics, musics => musics.feats)
    feats: Musics[]

    @OneToMany(() => Albums, albums => albums.performer, {nullable:true})
    albums: Albums[]

    @OneToMany(() => Likes, likes => likes.user, {nullable:true}) 
    likeMusic: Likes[] 
    
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}

export {Users};
