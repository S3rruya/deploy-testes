import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const setDataSourceConfig = (): DataSourceOptions => {
    const entities: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migration: string = path.join(__dirname,"./migrations/**.{js,ts}");
  
    const nodeEnv = process.env.NODE_ENV;
  
    if(nodeEnv === "production"){
      return {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [entities],
        migrations: [migration],
      }
    }
  
    if (nodeEnv === "test") {
      return {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [entities],
      };
    }
  
    return {
      type: "postgres",
      host: process.env.PGHOST,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT!),
      database: process.env.DB,
      synchronize: false,
      logging: true,
      entities: [entities],
      migrations: [migration],
    };
  };

const AppDataSource = new DataSource(setDataSourceConfig())

export default AppDataSource;