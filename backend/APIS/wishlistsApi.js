const exp=require('express')

const wishlistsApi=exp.Router();

wishlistsApi.use(exp.json())

const expressAsyncHandler=require('express-async-handler')

wishlistsApi.get('/all-todos', expressAsyncHandler(async (request,response)=>{
    //console.log("HIIIIII")
    const wishlistsCollection=request.app.get("wishlistsCollection");
    let works=await wishlistsCollection.find().toArray();
    response.send({payload:works});
}))

wishlistsApi.post('/add-todo',expressAsyncHandler(async (request,response)=>{
    console.log("request recieved")
    const wishlistsCollection=request.app.get("wishlistsCollection");
    let newTodo=request.body;
    await wishlistsCollection.insertOne(newTodo)
    response.send("added todo successfully")
}))

wishlistsApi.delete('/remove/:id',expressAsyncHandler(async (request,response)=>{
    const ID=+(request.params.id)
    const wishlistsCollection=request.app.get("wishlistsCollection");
    await wishlistsCollection.deleteOne({id:ID})
    response.send('removed Successfully')
}))

module.exports=wishlistsApi;