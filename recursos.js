import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

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

app.get("/", (req, res) => {
    res.send("¡Bienvenido a recursos!");
});

app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.recursos);
});

app.get("/recursos/:id",(req,res)=>{
    const data=readData();
    const id=parseInt(req.params.id);
    const recurso=data.recursos.find((recurso)=>recurso.id_recurso===id);
    res.json(recurso);
});


app.post("/recursos",(req,res)=>{
    const data=readData();
    const body=req.body;
    const nuevoRecurso ={
    ...body,
    };
    data.recursos.push(nuevoRecurso);
    writeData(data);
    res.json(nuevoRecurso);
});

// UPDATE
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.recurso === id);
    data.recursos[recursoIndex] = {
    ...data.recursos[recursoIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Recurso updated successfully" });
});

//Creem un endpoint per eliminar un recurso
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id_recurso === id);

    data.recursos.splice(recursoIndex, 1);
    writeData(data);
    res.json({ message: "Recurso deleted successfully" });
});

// Request es una petición que se hace al servidor
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});

