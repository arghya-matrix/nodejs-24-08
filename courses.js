const con= require("./config");
const express= require("express");
const server=express();
const bodyParser= require("body-parser");
const port= 3031;

server.use((req,res,next)=>{
    console.log(req.method, req.ip, req.path);
    next();
});

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.get("/table/:name", (req,res)=>{
    const tableName= req.params.name;
    const tableId= req.body.tableId;
    const Name=req.body.Name
    con.query(`create table ${tableName} (s_no int(5) primary key auto_increment, 
    ${tableId} int(5), ${Name} varchar(10))`, (err, results)=>{
        if(err) throw err;
        else{
            con.query(`select * from ${tableName}`, (error, result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })
});

//Insert

server.post("/insert",(req,res)=>{
    const tableName= req.body.tableName;
    const c_id= req.body.c_id;
    const c_name=req.body.c_name;
    con.query(`insert into ${tableName} (c_id, c_name) values(${c_id}, '${c_name}')`, (err,results)=>{
        if(err) throw err;
        else{
            con.query(`select * from ${tableName}`, (err, data)=>{
                if(err) throw err;
                res.send(data); 
            })
        }
    })
});

// Update id by name
server.put("/update-id/:name", (req,res)=>{
    const c_name= req.params.name;
    const newid= req.body.newid;
    con.query(`update courses set c_id = ${newid} where (c_name ='${c_name}')`, (err, results)=>{
        if(err) throw err;
        else{
            con.query(`select * from courses where (c_name='${c_name}')`,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })
})
// update name by id

server.put("/update-name/:id", (req,res)=>{
    const c_id= req.params.id;
    const newname= req.body.name;
    con.query(`update courses set c_name = '${newname}' where (c_id ='${c_id}')`, (err, results)=>{
        if(err) throw err;
        else{
            con.query(`select * from courses where (c_id ='${c_id}')`,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })
});

//delete row by id
server.delete("/delete-id/:id", (req,res)=>{
    const c_id= req.params.id;
    con.query(`delete from courses where (c_id=${c_id})`,(err,results)=>{
        if(err) throw err;
        else{
            con.query(`select * from courses`,(error, result)=>{
                if(error) throw error;
                else {
                    res.send(result);
                }
            })
        }
    })
});

//delete row by name
server.delete("/delete-name/:name", (req,res)=>{
    const c_name= req.params.name;
    con.query(`delete from courses where (c_name=${c_name})`,(err,results)=>{
        if(err) throw err;
        else{
            con.query(`select * from courses`,(error, result)=>{
                if(error) throw error;
                else {
                    res.send(result);
                }
            })
        }
    })
});

server.listen(port,()=>{
    console.log(`server started at ${port}`);
})