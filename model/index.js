const axios = require("axios");

exports.verCardapio = async (msg, params) => {
  let url = "https://sheetdb.io/api/v1/n336497nyc3ky";
  let cardapio = [];
  let produto = {};
  let retorno = {};

  return await axios
    .get(url)
    .then((resultado) => {
      retorno = resultado.data;

      retorno.forEach((element) => {
        produto = {
          titulo: `Cod: ${element.Codigo} - ${element.Nome}`,
          preco: `R$ ${element.Preco}`,
          url: element.Imagem,
        };

        cardapio.push(produto);
      });

      let resposta = {
        tipo: "card",
        cardapio,
      };

      return resposta;
    })
    .catch((err) => console.log(err));
};

exports.verStatus = (msg, params) => {
  let resposta = {
    tipo: "texto",
    mensagem: "Calma que já estamos preparando seu pedido.",
  };
  return resposta;
};
