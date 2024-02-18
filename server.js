const express=require("express");
const app=express();
const mysql2=require("mysql2");
const fileuploader=require('express-fileupload');

app.listen(3000, function(){
    console.log("http://localhost:3000/")
});

app.use(express.static("public"));

const congObj={
    host:"127.0.0.1",
    user:"root",
    password:"T#9758@qlph",
    database:"project",
    dateStrings:true
}

const mysql=mysql2.createConnection(congObj);

mysql.connect(function(err){
    if(err==null)
        console.log("connected to database");
    else
        console.log(err.message);
})

app.get("/", function(req, resp){
    let filePath=process.cwd()+"/public/index.html";
    resp.sendFile(filePath);
})

app.use(express.urlencoded({extended:true}));

app.post("/signup" ,function(req,resp){
    // create table project (EmailId varchar(100) primary key, password varchar(30), memType varchar(30), dos date, ustatus int);

    const email=req.body.txtEml;
    const pwd=req.body.txtPwd;
    const member=req.body.inlineRadioOptions;

    // console.log(req.body);

    if (!pwd || !member) {
        resp.send("Password and member are required");
    } 
    else {
        mysql.query("INSERT INTO project VALUES (?, ?, ?, CURRENT_DATE, 1)", [email, pwd, member], function(err) {
            if (err === null) {
                resp.send("Signed up successfully");
            } else {
                resp.send(err.message);
            }
        });
    }
    
})

app.get("/check", function(req, resp){
    mysql.query("select * from project where EmailId=?",[req.query.kuchMail],function(err, resultJsonArry){
        if(resultJsonArry.length==1){
            resp.send("email id is not available");
            document.getElementById("errRes").classList.add("not-ok");
        }
        else    
            resp.send("Available!");
    })
})

app.get("/profile-customer", function(req, resp){
    let filePath=process.cwd()+"/public/profile-customer.html";
    resp.sendFile(filePath);    
})

app.post("/login", function(req, resp){
    const email=req.body.txtEml;
    const pwd=req.body.txtPwd;

    mysql.query("select * from project where EmailId=? and password=? and ustatus=1", [req.query.kuchMail],[req.query.kuchPass], function(err, resultJsonAry){
        if(resultJsonAry.length==1)
            resp.send("Login is successfull");
        else
            resp.send(err.message);
    })

})

app.get("/admin", function(req, resp){
    let filePath=process.cwd()+"/public/admin.html";
    resp.sendFile(filePath);
})

app.get("/customer-dashboard", function(req, resp){
    let filePath=process.cwd()+"/public/customer-dashboard.html";
    resp.sendFile(filePath);
})
