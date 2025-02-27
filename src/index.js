const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.routes.js');
const db = require('./config/db');
const cors = require('@koa/cors');
const { responseHandler } = require('./helper/responseHandler.js');
require("dotenv").config();

const app = new Koa();

app.use(responseHandler());
app.use(cors());

app.use(bodyParser());

app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
