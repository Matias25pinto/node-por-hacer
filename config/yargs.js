const descripcion = {
    demand: true, // El comando es obligatorio
    alias: 'd', // El alias del comando
    desc: 'Descripción de la tarea por hacer' // Descripcion del comando
}
const completado = {
    default: true, // El comando es obligatorio
    alias: 'c', // El alias del comando
    desc: 'Marca como completado o pendiente la tarea' // Descripcion del comando
}
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualizar el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borra una tarea', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}