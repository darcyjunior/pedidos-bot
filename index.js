const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.listen(porta, () =>
  console.log(`Servidor inicializado em: http://${hostname}:${porta}`)
);
