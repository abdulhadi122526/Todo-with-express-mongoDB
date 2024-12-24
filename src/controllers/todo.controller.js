import mongoose from "mongoose";
import Todos from "../models/todos.models.js";

// add data in db

const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description)
    return res.status(404).json({
      massage: "title or description is required",
    });

  try {
    const todo = await Todos.create({
      title,
      description,
    });
    res.json({
      message: "send todo successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// get all data from db

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.json({
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// get single item from db
const getSingleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "invalid id" });

  try {
    const todo = await Todos.findById({ _id: id });

    if (!todo) return res.status(404).json({ message: "not found" });

    res.json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// delete todo item

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "invalid id" });

  try {
    const todo = await Todos.findByIdAndDelete({ _id: id });
    if (!todo) return res.status(404).json({ message: "no todo found" });

    res.json({
      message: "item deleted successfully",
      deleteData: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// edit item 
const editTodo = async (req, res) => {
 const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message: "Invalid id"})

  try {
     
    const editItem = await Todos.findByIdAndUpdate(
      {_id: id},
      {...req.body},
      {new:true}
    )
    if(!editItem) return res.status(404).json({
      message: "no data found",
    })
    res.json({
      message: "edit item successfully",
      editData: editItem,
    })




  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }



};
export { addTodo, getAllTodo, getSingleTodo, deleteTodo, editTodo };
