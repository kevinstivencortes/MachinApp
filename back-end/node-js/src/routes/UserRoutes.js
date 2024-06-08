import { Router } from "express";
import {
  EliminarUsuario,
  ListarTecnicos,
  ListarUsuarioId,
  ListarUsuarios,
  Store,
  actualizarUsuario,
} from "../controllers/UserController.js";

// verificacion de campos

// validar token que llega por la cabecera de la solicitud
import { verificar } from "../middlewares/LoginMidleware.js";

import { cargarImagen } from "../config/storageArchivos.js";

import { recuperaraContra } from "../controllers/UserController.js";
import { isAdmin, adminAndInstructor } from "../middlewares/isAdministrador.js";

const RutaUsuario = Router();

RutaUsuario.post("/registrar", cargarImagen, Store);
RutaUsuario.get("/listar", verificar, isAdmin, ListarUsuarios);
RutaUsuario.put("/actualizar/:id", verificar, actualizarUsuario);
RutaUsuario.delete("/eliminar/:id", verificar, EliminarUsuario);
RutaUsuario.get("/listar/:id", verificar, ListarUsuarioId);
RutaUsuario.get("/tecnico", verificar, ListarTecnicos);

RutaUsuario.post("/recuperar", recuperaraContra);

export default RutaUsuario;
