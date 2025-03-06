import { Router } from "express";
import { pool } from "../dbsito.js";

const routes = Router();


routes.get('/sus', async (req, res) => {
    const cedula = req.query.cedula;
    let responsekp;

    if (!cedula) {
        return res.status(400).json({ error: 'Se debe proporcionar un número de cédula' });
    }
    await pool.query("SELECT COUNT(*) AS count FROM socios WHERE cedula = ?", [cedula], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
        responsekp = !!results[0].count > 0;
    });
    res.json({responsekp});
});



export default routes