const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Olá chatbot");
});

app.get("/pergunta", (req, res) => {
  const msg = req.query.pergunta;
  res.send("Qual a sua pergunta?" + msg);
});

app.get("/mensagem/:tipo/:id", (req, res) => {
  console.log(req.params.tipo);
  res.send("resposta");
});

app.post("/pedido", (req, res) => {
  console.log(req.body);
  res.send("pedido recebido");
});

app.listen(3000, () => console.log("Servidor inicializado na porta 3000"));
