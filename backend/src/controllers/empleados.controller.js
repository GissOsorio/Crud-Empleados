const empleadoCtrl={};
const Empleado = require('../models/Empleado');


empleadoCtrl.getEmpleados = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
};
empleadoCtrl.createEmpleado= async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    try {
        const { nombre, cargo, departamento, sueldo } = req.body;
        const empleado = new Empleado({
            nombre,
            cargo,
            departamento,
            sueldo
        });
        console.log(empleado);
        await empleado.save();
        res.json({ status: 'Datos guardados' });
    } catch (error) {
        console.error('Error al guardar el empleado:', error);
        res.status(500).json({ error: 'Error al guardar el empleado' });
    }
}
empleadoCtrl.getEmpleado=(req,res)=>{}

empleadoCtrl.editEmpleado = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    try {

        const empleado = {
            nombre: req.body.nombre,
            cargo: req.body.cargo,
            departamento: req.body.departamento,
            sueldo: req.body.sueldo
        };
        const updatedEmpleado = await Empleado.findByIdAndUpdate(req.params.id, empleado, { new: true });

        if (!updatedEmpleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' + req.params.id});
        }

        res.json({ status: 'Datos actualizados' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
};

empleadoCtrl.deleteEmpleado = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    try {
        // Attempt to find and remove the employee by ID
        const deletedEmpleado = await Empleado.findByIdAndRemove(req.params.id);

        if (!deletedEmpleado) {
            // If no employee was found and deleted, return a 404 status
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        // If the employee was successfully deleted, send a success response
        res.json({ status: 'Empleado ha sido removido' });
    } catch (error) {
        // Handle errors here
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
};

module.exports=empleadoCtrl;