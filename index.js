import express from "express";
//import reservasRoutes from "./routes/reservas2";
import notificacionesRoutes from "./routes/notificaciones2.js";
import reservasRoutes from "./routes/reservas2.js";
import usuariosRoutes from "./routes/usuarios2.js";
import recursosRoutes from "./routes/recursos2.js";


//import methodOverride from "method-override"

//Creo l'objecte de l'aplicació
const app=express();
app.use(express.json())
app.use(express.static("public"));//carpeta publica pel css
app.use(express.urlencoded({extended:true}))
//app.use(methodOverride('_method'))

app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs


app.get("/",(req,res)=>{
    res.render("home");
});

//app.use("/reservas", reservasRoutes);
app.use("/notificaciones", notificacionesRoutes);
app.use("/reservas", reservasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/recursos", recursosRoutes);


//Funció per escoltar
app.listen(3000,()=>{
    console.log("Server listing on port 3000");
});