import express from "express";
import fs from "fs";

const router = express.Router();

const readData = () => {
    try {
        const data = fs.readFileSync("./reservas.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./reservas.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

router.get('/', (req, res) => {
    console.log("ENTRA")
    const user={name:"Manuel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("reservas",{user, data,htmlMessage})
});

router.get("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reserva = data.reservas.find((reserva) => reserva.id_reserva === id);
    res.json(reserva);
});

router.post("/", (req, res) => {
    const data=readData();
    const body=req.body;
    const nuevaReserva = {
    ...body,
    };
    data.reservas.push(nuevaReserva);
    writeData(data);
    res.json(nuevaReserva);
});

router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id_reversa === id);
    data.reservas[reservaIndex] = {
    ...data.reservas[reservaIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Reserva actualizada con éxito." });
});

router.delete("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id_reserva === id);
    data.reservas[reservaIndex] = {
        ...data.reservas[notificacionIndex],
        ...body,
    }

    data.reservas.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "Reserva eliminada con éxito." });
});

export default router;
