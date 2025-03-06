import express from 'express';
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
    host: 'mysql',
    user: 'admincerrito',
    password: 'dbcerritoccp',
    database: 'padronccp',
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');

    db.query('SHOW TABLES LIKE "socios"', (err, results) => {
        if (err) {
            console.error('Error al verificar existencia de la tabla:', err);
            return;
        }

        if (results.length === 0) {
            const createTableSQL = `
        CREATE TABLE socios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mesa INT,
          orden INT,
          apellido VARCHAR(255),
          nombre VARCHAR(255),
          cedula VARCHAR(20)
        );
      `;

            db.query(createTableSQL, (err) => {
                if (err) {
                    console.error('Error al crear la tabla socios:', err);
                    return;
                }
                console.log('Tabla socios creada exitosamente');
            });
        } else {
            console.log('La tabla socios ya existe');
        }
    });
});

app.get('/verificar-cedula', (req, res) => {
    const cedula = req.query.cedula;

    if (!cedula) {
        return res.status(400).json({ error: 'Se debe proporcionar un número de cédula' });
    }

    db.query('SELECT COUNT(*) AS count FROM socios WHERE cedula = ?', [cedula], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }

        const exists = results[0].count > 0;
        res.json({ exists });
    });
});

app.listen(3000)
