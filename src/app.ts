import "express-async-errors";

import "reflect-metadata";
import express from "express";
import { handleError } from "./errors";
import { userRoutes, loginRoutes, genresRoutes, adminRoutes, musicsRoutes, playlistsRoutes } from "./routes";
import albumsRoutes from "./routes/albums/albums.routes";



const app = express()

app.use(express.json())

app.use("/admin", adminRoutes)
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/genres", genresRoutes)
app.use("/musics", musicsRoutes)
app.use("/albums", albumsRoutes)
app.use("/playlists", playlistsRoutes)

app.use(handleError)

export default app;