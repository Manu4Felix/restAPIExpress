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

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.get('/reservas', (req, res) => {
    const user={name:"Manuel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("reservas",{user, data,htmlMessage})
});

app.get("/", (req, res) => {
    res.render("home");
});


app.get("/reservas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reserva = data.reservas.find((reserva) => reserva.id_reserva === id);
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
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id_reserva === id);
    data.reservas[reservaIndex] = {
        ...data.reservas[notificacionIndex],
        ...body,
    }

    data.reservas.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "Reserva deleted successfully" });
});

// Request es una petición que se hace al servidor
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});