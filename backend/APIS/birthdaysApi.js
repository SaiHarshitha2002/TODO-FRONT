const exp=require('express')

const birthdaysApi=exp.Router();

birthdaysApi.use(exp.json())

const expressAsyncHandler=require('express-async-handler')

birthdaysApi.get('/all-todos', expressAsyncHandler(async (request,response)=>{
    //console.log("HIIIIII")
    const workCollection=request.app.get("birthdaysCollection");
    let works=await workCollection.find().toArray();
    response.send({payload:works});
}))

birthdaysApi.post('/add-todo',expressAsyncHandler(async (request,response)=>{
    console.log("request recieved")
    const workCollection=request.app.get("birthdaysCollection");
    let newTodo=request.body;
    await workCollection.insertOne(newTodo)
    response.send("added todo successfully")
}))

birthdaysApi.delete('/remove/:id',expressAsyncHandler(async (request,response)=>{
    const ID=+(request.params.id)
    const workCollection=request.app.get("birthdaysCollection");
    await workCollection.deleteOne({id:ID})
    response.send('removed Successfully')
}))

module.exports=birthdaysApi;