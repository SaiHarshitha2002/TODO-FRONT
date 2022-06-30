const exp=require('express')

const personalApi=exp.Router();

personalApi.use(exp.json())

const expressAsyncHandler=require('express-async-handler')

personalApi.get('/all-todos', expressAsyncHandler(async (request,response)=>{
    //console.log("HIIIIII")
    const personalCollection=request.app.get("personalCollection");
    let works=await personalCollection.find().toArray();
    response.send({payload:works});
}))

personalApi.post('/add-todo',expressAsyncHandler(async (request,response)=>{
    console.log("request recieved")
    const personalCollection=request.app.get("personalCollection");
    let newTodo=request.body;
    await personalCollection.insertOne(newTodo)
    response.send("added todo successfully")
}))

personalApi.delete('/remove/:id',expressAsyncHandler(async (request,response)=>{
    const ID=+(request.params.id)
    const personalCollection=request.app.get("personalCollection");
    await personalCollection.deleteOne({id:ID})
    response.send('removed Successfully')
}))

module.exports=personalApi;