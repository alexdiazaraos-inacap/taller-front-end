import React,{Fragment,useState,useRef, useEffect} from "react";
import {v4 as uuid} from 'uuid';
import { TodoItem } from "./PostItItem";

const KEY = "todolist-todos"

export function TodoList(){

    const [todos,setTodos]= useState([]);

    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(todos));
    },[todos])

    const tituloRef = useRef();
    const descripcionRef = useRef();    
    const importanteRef = useRef();
    
    const agregarNota = () => {
        console.log("AGREGANDO TAREA")
        const nota = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const estado = importanteRef.current.checked;
        var importante = false
        if(estado){
            importante = true
        }
        console.log(nota);
        console.log(descripcion);
        console.log(estado);

        if (nota ==='') return;
        if (descripcion ==='') return;

        setTodos((prevTodos)=>{
            const nuevaNota = {
                id: uuid(),
                nota: nota,
                descripcion: descripcion,
                importante: importante
            }
            return [...prevTodos, nuevaNota]
        })
        tituloRef.current.value = null;
        descripcionRef.current.value = null;
    }
    
    const eliminarNota = (id) => {
        console.log("ELIMINANDO NOTA "+id)
        const newNotas = todos.filter((todo) => todo.id !== id);
        setTodos(newNotas);
        console.log(newNotas);        
    }

    return (
        <Fragment>
            <h1>Post It Simulador!</h1>

            <form className="row g-3">
                <div className="col-auto">
                    <input ref={tituloRef} type="text" className="form-control" placeholder="Título" />
                </div>
                <div className="col-auto">
                    <input ref={descripcionRef} type="text" className="form-control" placeholder="Descripción" />
                </div>
                <div className="form-check col-auto">
                    <input ref={importanteRef}  className="form-check-input" type="checkbox" id="chxImportante"/>
                    <label className="form-check-label" for="chxImportante">
                        Importante
                    </label>
                </div>
                <div className="col-auto">
                    <button onClick={agregarNota} type="button" className="btn grisoscuro text-white mb-3">Agregar</button>
                </div>

                <div className="row">
                {todos.map((todo)=>(
                    <TodoItem todo={todo} key={todo.id}></TodoItem>
                ))}
            </div>
            </form>
        </Fragment>
    )
}