import express from "express";
import { addTodo, deleteTodo, editTodo, getAllTodo, getSingleTodo } from "../controllers/todo.controller.js";



const router = express.Router();


router.post("/todo" , addTodo);
router.get("/todo" , getAllTodo);
router.get("/todo/:id" , getSingleTodo);
router.delete("/todo/:id" , deleteTodo);
router.put("/todo/:id" , editTodo);

export default router;