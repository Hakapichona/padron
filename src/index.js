import express from 'express';
import routes from "./routes/socio.routes.js";

const app = express();

app.use(routes);

app.listen(3000)
