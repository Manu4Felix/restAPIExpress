import express from "express";
import fs from "fs";

const router = express.Router();

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

router.get('/', (req, res) => {
    console.log("ENTRA")
    const user={name:"Manuel"}
    const htmlMessage = `
    <p>A continuación, puedes ver la <strong>lista de notificaciones.</strong> Para volver atrás, pulse Home:</p>
    <a href="/">Home</a>`;
    const data = readData();
    res.render("notificaciones",{user, data,htmlMessage})
});

router.get("/:id", (req, res) => {
    const data = readData();
    const user={name:"Manuel"}
    const htmlMessage = `
    <a href="/notificaciones">Lista de Notificaciones</a>`;
    const id = parseInt(req.params.id);
    const notificacion = data.notificaciones.find((notificacion) => notificacion.id_notificacion === id);
    res.render("notificacionesDetalles",{user, notificacion, htmlMessage})

});

router.post("/", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotificacion = {
        ...body
    };
    data.notificaciones.push(newNotificacion);
    writeData(data);
    res.json(newNotificacion);
});

router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionIndex = data.notificaciones.findIndex((n) => n.id_notificacion === id);
    data.notificaciones[notificacionIndex] = {
        ...data.notificaciones[notificacionIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Notificación actualizada con éxito" });
});

router.delete("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionIndex = data.notificaciones.findIndex((notificacion) => notificacion.id_notificacion === id);
    data.notificaciones[notificacionIndex] = {
        ...data.notificaciones[notificacionIndex],
        ...body,
    }

    data.notificaciones.splice(notificacionIndex, 1);
    writeData(data);
    res.json({ message: "Notificación eliminada con éxito" });
});

export default router;
