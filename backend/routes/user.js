const express = require('express')
const router = express.Router();
const db = require('../model/connection');
const session = require('express-session')


//Display users data
router.post('/login', (req, res) => {

    const { Email,Password } = req.body;
    console.log(Password)
    db.query(`SELECT * FROM users WHERE email='${Email}'`, (error, results) => {
      if (error) {
        console.log(error)
        
      }
      else if(results.rowCount>0){
        console.log(results)
      if(results.rows[0].password===Password){
        req.session.user = {
          id:results.rows[0].id,
             firstname: results.rows[0].firstname ,
             lastname:results.rows[0].lastname,
             email:results.rows[0].email,
          role: results.rows[0].role
        };
        console.log(results.rows)
        res.status(200).json({user: req.session.user});
      }
      else{
        res.status(200).json({user:1})
      }
      
    }
    else{
      console.log(results)
      res.status(200).json({user:0})
    }
    
    });
  });


// Signup 
  router.post('/signup', (req, res) => {
    console.log(req.body)
    const { FirstName,LastName,Email,Mobile,Password } = req.body;
    db.query(`SELECT * FROM users WHERE email='${Email}'`, (error, results) => {
      if (error) {
        console.log(error)
        
      }
      else if(results.rowCount>0){
        console.log(results)
        res.status(200).json({user:0})
      
    }
    else{
      db.query(`INSERT INTO users (FirstName,LastName,Email,Mobile,Password) VALUES ('${FirstName}', '${LastName}','${Email}','${Mobile}','${Password}')`,  (error, result) => {
        if (error) {
          throw error;
        }
        db.query(`SELECT * FROM users WHERE email='${Email}'`, (error, results) => {
          if (error) {
            throw error;
          }
          req.session.user = {
            id:results.rows[0].id,
            firstname: results.rows[0].firstname ,
            lastname:results.rows[0].lastname,
            email:results.rows[0].email,
         role: results.rows[0].role
       };
       console.log(results.rows)
       res.status(200).json({user: req.session.user});
        })
      
      });
    }
  })
    
   
  });


  //Add task in backend
  router.post('/addtask', (req, res) => {
    console.log(req.body)
    const { username,email,task,task_time,task_date } = req.body;
  
    db.query(`INSERT INTO tasks (task_time,task_date,task,username,user_email) VALUES('${task_time}','${task_date}','${task}','${username}','${email}');`,  (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result.rows)
     res.send("INSERTED");
    
    });
  });


  //view task
  router.post('/viewtask', (req, res) => {

    const { role,email } = req.body;
    if(role==='user'){
      db.query(`SELECT * FROM tasks WHERE user_email='${email}'`, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results.rows)
       res.status(200).json(results.rows);
        
      });
    }else if(role==='admin'){
      db.query(`SELECT * FROM tasks `, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results.rows)
       res.status(200).json(results.rows);
        
      });
    }
   
  });
//delete task
  router.post('/deletetask', (req, res) => {

    const { task_id } = req.body;
   
      db.query(`DELETE FROM tasks WHERE task_id='${task_id}'`, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results)
       res.send("Deleted Successfully")
        
      });
    
   
  });

  //send data on update page
  router.post('/taskrequired', (req, res) => {

    const { task_id } = req.body;
    
      db.query(`SELECT * FROM tasks WHERE task_id='${task_id}'`, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results.rows)
       res.status(200).json(results.rows);
        
      });
   
   
  });
//update task
  router.post('/updatetask', (req, res) => {

    const { task_id,task,task_time,task_date } = req.body;
    
      db.query(`UPDATE tasks SET task='${task}' ,task_time='${task_time}',task_date='${task_date}' WHERE task_id='${task_id}'`, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results)
       res.send('UPDATED')
        
      });
   
   
  });
  
//update status
  router.post('/status', (req, res) => {

    const { task_id } = req.body;
    
      db.query(`UPDATE tasks SET status='Completed' WHERE task_id='${task_id}'`, (error, results) => {
        if (error) {
          throw error;
        }
        
       console.log(results)
       res.send('UPDATED')
        
      });
   
   
  });
  


module.exports = router