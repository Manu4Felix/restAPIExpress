import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

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

app.get("/", (req, res) => {
    res.send("¡Bienvenido a reservas!");
});

app.get("/reservas", (req, res) => {
    const data = readData();
    res.json(data.reservas);
});

app.get("/reservas/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const reserva=data.reservas.find((reserva)=>reserva.id_reserva===id);
    res.json(reserva);
});


app.post("/reservas",(req,res)=>{
    const data=readData();
    const body=req.body;
    const nuevaReserva ={
    ...body,
    };
    data.reservas.push(nuevaReserva);
    writeData(data);
    res.json(nuevaReserva);
});

// UPDATE
app.put("/reservas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id_reversa === id);
    data.reservas[reservaIndex] = {
    ...data.reservas[reservaIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Reserva updated successfully" });
});

//Creem un endpoint per eliminar un usuario
app.delete("/reservas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id_reserva === id);

    data.reservas.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "Reserva deleted successfully" });
});

// Request es una petición que se hace al servidor
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});