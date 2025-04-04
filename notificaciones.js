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

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.get('/notificaciones', (req, res) => {
    const user={name:"Manuel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("notificaciones",{user, data,htmlMessage})
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/notificaciones/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificacion = data.notificaciones.find((notificacion) => notificacion.id_notificacion === id);
    res.json(notificacion);
});

app.post("/notificaciones", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotificacion = {
        ...body
    };
    data.notificaciones.push(newNotificacion);
    writeData(data);
    res.json(newNotificacion);
});

app.put("/notificaciones/:id", (req, res) => {
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

app.delete("/notificaciones/:id", (req, res) => {
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

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
