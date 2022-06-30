const exp=require('express')

const workApi=exp.Router();

workApi.use(exp.json())

const expressAsyncHandler=require('express-async-handler')

workApi.get('/all-todos', expressAsyncHandler(async (request,response)=>{
    //console.log("HIIIIII")
    const workCollection=request.app.get("workCollection");
    let works=await workCollection.find().toArray();
    response.send({payload:works});
}))

workApi.post('/add-todo',expressAsyncHandler(async (request,response)=>{
    console.log("request recieved")
    const workCollection=request.app.get("workCollection");
    let newTodo=request.body;
    await workCollection.insertOne(newTodo)
    response.send("added todo successfully")
}))

workApi.delete('/remove/:id',expressAsyncHandler(async (request,response)=>{
    const ID=+(request.params.id)
    console.log(ID);
    console.log('called');
    const workCollection=request.app.get("workCollection");
    await workCollection.deleteOne({id:ID})
    response.send('removed Successfully')
}))

module.exports=workApi;