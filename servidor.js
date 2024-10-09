const express = require('express'); //importa el módulo express (framework de node.js) para la creación de api y app web
const app = express(); //crea una aplicación express
const PORT = 3000; 
//iniciar el servidor
app.listen
(PORT,()=>
    {
        console.log('Servidor ejecutando en http://localhost:${PORT}'); //se manda un mensaje para notificar del servidor
    }
);
//implementar métodos get, post, put y delete
//poner código en github para revisión

app.use(express.json()); //condición de petición de la aplicación a la pag web, acepta datos en formato json


//arreglo "todos"
let todos=
[
    {id:1,tarea:'Limpiar cocina'},
    {id:2,tarea:'Lavar los trastes'},
    {id:3,tarea:'Hacer de comer'},
    {id:4,tarea:'Lavar la ropa'},
    {id:5,tarea:'Barrer el cuarto'}
]

//métodos
//GET: obtener arreglo todos
app.get
(
    '/tareas', //ruta

    (req,res)=>//función que se ejecuta cuando se hace la petición

        {
            res.json(todos); //envía respuesta en formato json

        }
);

//GET: obtener una tarea por id
app.get
(
    '/tareas/:id',
    (req,res)=>
    {
        const id=parseInt(req.params.id); //convierte el id a un valor entero
        const tarea=todos.find(e=>e.id === id); //busca la tarea en el arreglo que coincida con el id
        //si coincide con la id coincide, se envia el resultado de tarea, si no encuentra la tarea, envía un mensaje de error
        if(tarea)
        {
            res.json(tarea);
        }
        else
        {
            res.status(404).send('Estudiante no localizado');
        }
    }
)

//POST: agregar tarea
app.post
(
    '/tareas',
    (req,res)=>
    {
        const newTarea = 
        {
            id:todos.length+1, //hace el recorrido de uno por uno del arreglo
            tarea:req.body.tarea //obtiene el valor de la tarea del body de la petición

        };
        todos.push(newTarea); //agrega la nueva tarea al arreglo
        res.status(201).json(newTarea); //envía respuesta en formato json

    }
);

//PUT: actualizar tarea
app.put
(
    '/tareas/:id',
    (req,res)=>
    {
        const id=parseInt(req.params.id);
        const chores=todos.find(t=>t.id===id);
        if(chores)
        {
            chores.tarea=req.body.tarea;// actualiza la tarea
            res.json(chores);// envía la tarea actualizada

        }
        else
        {
            res.status(404).send('Tarea no encontrada');
        }
    }
);

//DELETE:  eliminar tarea
app.delete
(
    '/tareas/:id', //ruta para eliminar tarea
    (req,res)=>
    {
        const id=parseInt(req.params.id);
        const index=todos.findIndex(t=>t.id===id);
        if(index!==-1)//si existe la tarea
        {
            todos.splice(index,1);//elimina la tarea del arreglo
            res.send('Tarea eliminada');
        }
        else
        {
            res.status(404).send('Tarea no encontrada');
        }
    }
);