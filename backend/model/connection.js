const {Client} = require('pg')

const client =new Client({
    host:'localhost',
    user:"postgres",
    port: 5432,
    
    password:'Taposh',
    database:'crudapp'
})

client.connect(err=>{
    if(err) console.log(err)
    else console.log('Database connected')
})

module.exports = client