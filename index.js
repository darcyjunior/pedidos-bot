const express = require("express");

const Model = require("./model/index");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá chatbot");
});

app.post("/webhook", (req, res) => {
  const mensagem = req.body.queryResult.queryText;
  const intencao = req.body.queryResult.intent.displayName;
  let parametros = null;
  let responder = "";
  let resposta = "";

  // if (
  //   req.body.queryResult.parameters &&
  //   req.body.queryResult.parameters.nao_vendemos
  // ) {
  //   responder = `Puxa não vendemos: ${req.body.queryResult.parameters.nao_vendemos}`;
  //   console.log("responder", responder);
  // }

  switch (intencao) {
    case "verCardapio":
      resposta = Model.verCardapio(mensagem, parametros);
      break;
    default:
      resposta = {
        tipo: "texto",
        mensagem: "Sinto muito, não entendi o que você está solicitando.",
      };
      break;
  }

  // if (intencao === "verCardapio") {
  //   responder = `${responder}. Nosso cardápio ainda está em elaboração, mas nós vendemos pizzas e refrigerantes!`;
  // } else if (intencao === "verStatus") {
  //   responder =
  //     "Seu pedido ainda está sendo preparado, por favor aguarde mais um instante.";
  // }

  if (resposta.tipo == "texto") {
    responder = {
      fulfillmentText: "Resposta do webhook",
      fulfillmentMessages: [
        {
          text: {
            text: [resposta.mensagem],
          },
        },
      ],
      source: "",
    };
  }

  res.send(responder);
});

const porta = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.listen(porta, () =>
  console.log(`Servidor inicializado em: http://${hostname}:${porta}`)
);

// app.get("/pergunta", (req, res) => {
//   const msg = req.query.pergunta;
//   res.send("Qual a sua pergunta?" + msg);
// });

// app.get("/mensagem/:tipo/:id", (req, res) => {
//   console.log(req.params.tipo);
//   res.send("resposta");
// });

// app.post("/pedido", (req, res) => {
//   console.log(req.body);
//   const produto = req.body.produto;
//   const qtd = req.body.quantidade;
//   const pgto = req.body.tipoPagamento;
//   const bebida = req.body.bebida;

//   const pedido = {
//     produto,
//     qtd,
//     pgto,
//     bebida,
//   };
//   res.json(pedido);
// });
