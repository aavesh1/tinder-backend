import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Cards from './dbcards.js'
import Fform from './fform.js'
import Cors from 'cors'
    //App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://aaveshtinderadmin:2MjSsjNAKTu7CY1f@cluster0.eph5a.mongodb.net/tinderdb?retryWrites=true&w=majority`
    //Middlewares
app.use(express.json())
app.use(Cors())    
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
//DB COnfig
 mongoose.connect(connection_url , {
     useNewUrlParser: true ,
     useCreateIndex: true , 
     useUnifiedTopology: true , 
 })   

    //API Endpoints
    app.get('/', (req , res)=> res.status(200).send('Hello World'))
    
    
    app.get('/createcard' , (req,res)=>{
            res.render('form.ejs')
    })


    app.post('/tinder/card' , (req , res)=>{
      const name = req.body.name ;
        const imgUrl = req.body.url ;
       Cards.create({name:name , imgUrl:imgUrl} , (err , data)=>{
           if (err) {
               console.log(err)
           }
           else {
               console.log(name)
               res.send(data)
           }
       } )
    });

    app.get('/tinder/card' , (req,res)=>{

      

        Cards.find((err , data)=>{
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(200).send(data)
            }}
            )
    })


        //FORM

        app.post('/fform' , (req , res)=>{
            const name = req.body.name ;
            const email = req.body.email ;
            const msg  = req.body.msg ;
              
             Fform.create({name:name , email : email , msg : msg} , (err , data)=>{
                 if (err) {
                     console.log(err)
                 }
                 else {
                     res.send(data)
                 }
             } )
          });
      
        app.get('/fform' , (req , res)=>{

            Fform.find((err , data)=>{
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.status(200).send(data)
                }}
                )


        })


    //Listener
    app.listen(port , ()=> console.log(`listening on ${port}`));