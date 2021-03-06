const express = require("express");

const Model = require("./model/index");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá chatbot");
});

app.post("/webhook", async (req, res) => {
  const mensagem = req.body.queryResult.queryText;
  const intencao = req.body.queryResult.intent.displayName;
  let parametros = null;
  let responder = "";
  let resposta = null;

  switch (intencao) {
    case "verCardapio":
      resposta = await Model.verCardapio(mensagem, parametros);
      break;
    case "verStatus":
      resposta = await Model.verStatus(mensagem, parametros);
      break;
    default:
      resposta = {
        tipo: "texto",
        mensagem: "Sinto muito, não entendi o que você está solicitando.",
      };
      break;
  }

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
  } else if (resposta.tipo == "imagem") {
    responder = {
      fulfillmentText: "Resposta do webhook",
      fulfillmentMessages: [
        {
          image: {
            imageUri: resposta.url,
          },
        },
      ],
      source: "",
    };
  } else if (resposta.tipo == "card") {
    let meuCardapio = [];
    let menuItem = {};

    resposta.cardapio.forEach((item) => {
      menuItem = {
        card: {
          title: item.titulo,
          subtitle: item.preco,
          imageUri: item.url,
        },
      };
      meuCardapio.push(menuItem);
    });

    responder = {
      fulfillmentText: "Resposta do webhook",
      fulfillmentMessages: meuCardapio,
      source: "",
    };
  }

  res.send(responder);
});

const porta = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.listen(porta, () =>
  console.log(`Servidor inicializado em: http://${hostname}:${porta}`)
);
