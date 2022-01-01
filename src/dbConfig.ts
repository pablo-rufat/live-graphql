import { createConnection } from "typeorm";

createConnection().then((connection) => {
    console.log('Database connected successfully.')
}).catch((error) => {
    console.log("Erro ao conectar com o banco de dados.")
    console.log(error);
});