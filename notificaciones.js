import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./notificaciones.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./notificaciones.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

app.get("/notificaciones", (req, res) => {
    const data = readData();
    res.json(data.notificacion);
});

app.get("/notificaciones/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificaciones = data.notificaciones.find((notificaciones) => notificaciones.id_notificacion === id);
    res.json(notificaciones);
});

app.post("/notificaciones", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotificacion = {
        ...body
    };
    data.notificacion.push(newNotificacion);
    writeData(data);
    res.json(newNotificacion);
});

app.put("/notificaciones/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionIndex = data.notificacion.findIndex(n => n.id_notificacion === id);
    data.notificacion[notificacionIndex] = {
        ...data.notificacion[notificacionIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Notificación actualizada con éxito" });
});

app.delete("/notificaciones/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificacionIndex = data.notificacion.findIndex((notificaciones) => notificaciones.id_notificacion === id);
    data.notificacion.splice(notificacionIndex, 1);
    writeData(data);
    res.json({ message: "Notificación eliminada con éxito" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
