import React from "react";

export function TodoItem({todo,eliminarNota}){
    const {id,nota,descripcion,importante} = todo
    let color = "card normal"
    
    const eliminar = (id) => {
        console.log("ELIMINANDO "+id);
        eliminarNota(id);
    }

    if (importante){
        color = "card importante"
    }

   
    return (
        <div className="p-3 col-lg-3 col-md-6 col-sm-12">
            <div className={color}>
                <div className="card-body">
                    <div className="row">
                        <div className ="card-title h3 col-10">{nota}</div>
                        <div className="pr-3 text-end col-2">
                            <button onClick={()=>eliminar(id)} type="button" className="btn-close btn-sm" aria-label="Close"></button>
                        </div>
                    </div>
                    <p className="card-text">{descripcion}</p>
                </div>
            </div>
        </div>
        
    )
}