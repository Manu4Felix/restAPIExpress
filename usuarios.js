import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuarios.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./usuarios.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("¡Bienvenido a clientes!");
});

app.get("/usuarios", (req, res) => {
    const data = readData();
    res.json(data.usuarios);
});

app.get("/usuarios/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const usuario=data.usuarios.find((usuario)=>usuario.id_usuario===id);
    res.json(usuario);
});

//Creem un endpoint del tipus post per afegir un llibre

app.post("/usuarios",(req,res)=>{
    const data=readData();
    const body=req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const nuevoUsuario ={
    ...body,
    };
    data.usuarios.push(nuevoUsuario);
    writeData(data);
    res.json(nuevoUsuario);
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id_usuario === id);
    data.usuarios[usuarioIndex] = {
    ...data.usuarios[usuarioIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "User updated successfully" });
});

//Creem un endpoint per eliminar un usuario
app.delete("/usuarios/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id_usuario === id);

    data.usuarios.splice(usuarioIndex, 1);
    writeData(data);
    res.json({ message: "User deleted successfully" });
});

// Request es una petición que se hace al servidor
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});

