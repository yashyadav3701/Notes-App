const moongoose=require('mongoose');
const mongoURI="mongodb+srv://yashyadav3701:Yaduvanshi3701@online-notebook.zwuyqnv.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async()=>{
    try {
       await moongoose.connect(mongoURI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("connected successfully");
    }catch(error){
        console.log("Error happened",error);
    }
}

module.exports=connectToMongo;