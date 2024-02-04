const express = require('express');
const {Todo} = require('../db/database')
const {authenticate} = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/addtodo', authenticate, (req,res)=>{
    let {title, description} = req.body;
    if(!title || !description){
        return res.status(400).json({error: "Bad request"})
    }
    const done = false;
    const userId = req.userId;
    const newTodo = new Todo({title, description, done, userId});
    
    newTodo.save()
    .then(todo=>{res.status(201).json({messege:"todo created succesfully", todo})})
    .catch(err => res.status(500).json({error: "Not able to create todo", err}))
})
router.put('/:todoId/done', authenticate, async(req, res)=>{
    const userId = req.userId;
    const todoId = req.params.todoId;
    try {
        const updatedTodo = await Todo.findOneAndUpdate({_id: todoId, userId}, {done: true}, {new : true});
        if(!updatedTodo){
            return res.status(404).json({error: "Todo not found"})
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(401).json({error: "Failed to update todo"})
    }
    
})

router.get('/', authenticate, async(req, res)=>{
    const userId = req.userId;
    try{
        const todos = await Todo.find({userId});
        res.json(todos);
    }catch(error){
        res.status(401).json({error: "Failed to retrieve todos"})
    }
})
module.exports = router;