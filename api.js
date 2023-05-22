const client = require("./connection.js");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, () => {
  console.log("Servidor funcionando na porta 3300");
});

client.connect();

app.get("/address", (req, res) => {
  client.query(`Select * from address`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/address/:id", (req, res) => {
  client.query(
    `Select * from address where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/address", (req, res) => {
  const address = req.body;
  let insertQuery = `insert into address(id, endereco, bairro, cidade, estado, pais) 
                       values(${address.id},'${address.endereco}', '${address.bairro}', '${address.cidade}', '${address.estado}', '${address.pais}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Gravado com sucesso");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.put('/address/:id', (req, res)=> {
    let address = req.body;
    let updateQuery = `update address
                       set endereco = '${address.endereco}',
                       bairro = '${address.bairro}',
                       cidade = '${address.cidade}',
                       estado = '${address.estado}',
                       pais = '${address.pais}'
                       where id = ${address.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Atualizado com sucesso')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/address/:id', (req, res)=> {
    let insertQuery = `delete from address where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Excluído com sucesso')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
