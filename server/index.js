    const bodyParser = require('body-parser');
    const express=require('express');
    const app=express();
    const mysql=require('mysql');
    const cors=require('cors');

    const db=mysql.createConnection({
        user:"root",
        host:"localhost",
        password:"ademz1s",
        database:"new_schema",
    });

    app.use(express.json());

    app.listen(3001,()=>{
        console.log("successfully running")
    });
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended:true }));


    app.get('/login',(req,res)=>{
        db.query("SELECT * FROM login",(err,result)=>{
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
    })

    app.post('/Register',(req,res)=>{
        const sqlInsert="INSERT INTO login (name,password) VALUES(?,?)"
        const name=req.body.name;
        const pass=req.body.pass;
        db.query(sqlInsert,[name,pass],(err,result)=>{
            if (err){
                console.log(err)
            }
            else{
                console.log(result)
            }
        })
    })
    app.post('/MineGame',(req,res)=>{
        const name=req.body.name;
        const score=req.body.score;
        const upd=req.body.upd
 
        const sqlUpdate = `
        UPDATE gamemode_scores
        SET minescore=?
        WHERE name=?`;

        const sqlINSERT=`
        INSERT INTO gamemode_scores(name,minescore) VALUES(?,?)`
        console.log(upd)
        if (upd===true){
            db.query(sqlUpdate, [score,name], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
        });}
            else{
                db.query(sqlINSERT, [name,score], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
        });}
    })
    app.get('/MScore',(req,res)=>{
        db.query("SELECT * FROM gamemode_scores",(err,result)=>{
            if (err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
    })

    app.post('/CarGame',(req,res)=>{
        const name=req.body.name;
        const score=req.body.score;
        const upd=req.body.upd
 
        const sqlUpdate = `
        UPDATE gamemode_scores
        SET carscore=?
        WHERE name=?`;

        const sqlINSERT=`
        INSERT INTO gamemode_scores(name,carscore) VALUES(?,?)`
        console.log(upd)
        if (upd===true){
            db.query(sqlUpdate, [score,name], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
        });}
            else{
                db.query(sqlINSERT, [name,score], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
        });}
    })