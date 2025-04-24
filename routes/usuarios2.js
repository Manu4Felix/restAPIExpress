import express from "express";
import fs from "fs";

const router = express.Router();

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

router.get('/', (req, res) => {
    console.log("ENTRA")
    const user={name:"Manuel"}
    const htmlMessage = `
    <a href="/">Home</a>`;
    const data = readData();
    res.render("usuarios",{user, data,htmlMessage})
});

router.get("/:id", (req, res) => {
    const data = readData();
    const user={name:"Manuel"}
    const htmlMessage = `
    <a href="/usuarios">Lista de Usuarios</a>`;
    const id = parseInt(req.params.id);
    const usuario = data.usuarios.find((usuario) => usuario.id_usuario === id);
    res.render("usuariosDetalles",{user, usuario, htmlMessage})
});

router.post("/", (req, res) => {
    const data=readData();
    const body=req.body;
    const nuevoUsuario = {
    ...body,
    };
    data.usuarios.push(nuevoUsuario);
    writeData(data);
    res.json(nuevoUsuario);
});

router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id_usuario === id);
    data.usuarios[usuarioIndex] = {
    ...data.usuarios[usuarioIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Usuario actualizado con éxito." });
});

router.delete("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id_usuario === id);
    data.usuarios[usuarioIndex] = {
        ...data.usuarios[usuarioIndex],
        ...body,
    }

    data.usuarios.splice(usuarioIndex, 1);
    writeData(data);
    res.json({ message: "Usuario eliminado con éxito." });
});

export default router;
