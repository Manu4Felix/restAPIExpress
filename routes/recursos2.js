import express from "express";
import fs from "fs";

const router = express.Router();

const readData = () => {
    try {
        const data = fs.readFileSync("./recursos.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./recursos.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

router.get('/', (req, res) => {
    console.log("ENTRA")
    const user={name:"Manuel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="http://localhost:3000/">Home</a>`;
    const data = readData();
    res.render("recursos",{user, data,htmlMessage})
});

router.get("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id_recurso === id);
    res.json(recurso);
});

router.post("/", (req, res) => {
    const data=readData();
    const body=req.body;
    const nuevoRecurso = {
    ...body,
    };
    data.recursos.push(nuevoRecurso);
    writeData(data);
    res.json(nuevoRecurso);
});

router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id_recurso === id);
    data.recursos[recursoIndex] = {
    ...data.recursos[recursoIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Recurso actualizado con éxito." });
});

router.delete("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id_recurso === id);
    data.recursos[recursoIndex] = {
        ...data.recursos[recursoIndex],
        ...body,
    }

    data.recursos.splice(recursoIndex, 1);
    writeData(data);
    res.json({ message: "Recurso eliminado con éxito." });
});

export default router;
