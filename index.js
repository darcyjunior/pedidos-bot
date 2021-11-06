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
  const produto = req.body.produto;
  const qtd = req.body.quantidade;
  const pgto = req.body.tipoPagamento;
  const bebida = req.body.bebida;

  const pedido = {
    produto,
    qtd,
    pgto,
    bebida,
  };
  res.json(pedido);
});

app.listen(3000, () => console.log("Servidor inicializado na porta 3000"));
