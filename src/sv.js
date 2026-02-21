const express = require('express')
const paths = require("path")
const brypts = require("bcrypt")
const dotyenv = require("dotenv")
const collection = require('./stb')
const session = require("express-session");

dotyenv.config()
const app = express();
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));
const port = 5001;
app.set('view engine','ejs');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get('/home',(req,res) =>{
    res.render('index')
})
app.get('/choice',(req,res) =>{
    res.render('choice')
})

app.get('/login',(req,res) =>{
    res.render('login')
})
app.get('/signup',(req,res) =>{
    res.render('sign')
})  

app.post("/signup", async (req,res)=>{
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    const exist = await collection.findOne({email: data.email});
    if (exist){
        res.send("Đã tồn tại tên")
    }else{
        const salt_round = +process.env.salt_r;
        const hashed_pass = await brypts.hash(data.password,salt_round)
        data.password = hashed_pass
        const user_dat = await collection.insertMany([data]);
        req.session.userId = user_dat[0]._id;
        res.redirect("choice")
    }
    
})
app.post("/choice", async (req,res)=>{
    const userId = req.session.userId;
    const job = req.body.job;
    await collection.findByIdAndUpdate(userId, {
        job: job
    });
    if (job == "student") {
        return res.redirect("/stud");
    } else {
        return res.redirect("/teach");
    }
})

// Login
app.post("/login", async (req,res)=>{
    const check = await collection.findOne({email:req.body.email})
    if (!check){
        res.send('cannot find email')
    }
    const ismatch = await brypts.compare(req.body.password,check.password)
    if (ismatch){
        if (check.job == 'teacher'){
            res.redirect('/teach')
        }else{
            res.redirect('/stud')
        }
    }else{
        res.send('Sai mk')
    }
})

app.get('/teach',(req,res) =>{
    res.render('teach')
})


app.listen(port, () => {
    console.log(`Running on port: ${port}`);
})