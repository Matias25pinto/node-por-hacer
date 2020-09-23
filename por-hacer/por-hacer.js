const fs = require('fs'); // libreria FileSystem me permite almacenar en archivos

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); // convierte el JSON a un String
    // Utilizamos writeFile para guardar en un archivo
    //fs.writeFile('ubicacion', 'data a guardar', 'callBack')
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw Error('No se pudo grabar'); // de esta forma se captura un error en un callBack
        console.log('Se guardo el archivo');
    });
}

const cargarDB = () => {

    // Capturar el error, si el archivo esta vacio

    try {
        listadoPorHacer = require('../db/data.json'); // cargar un archivo JSON
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB(); // cargamos la BD

    let porHacer = {
        descripcion,
        completado: false,

    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {

    cargarDB(); // cargamos la BD

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    // findIndex(callBack); devuelve el index del elemento que cumplio la condicion del callBack, si no encontro nada devuelve -1
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;

        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let listadoPorHacerNuevo = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);

    if (listadoPorHacer === listadoPorHacerNuevo) {
        return false;
    } else {
        listadoPorHacer = listadoPorHacerNuevo;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}