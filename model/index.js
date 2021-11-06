exports.verCardapio = (msg, params) => {
  let resposta = {
    tipo: "imagem",
    url: "http://lorempixel.com/400/200/",
  };
  return resposta;
};

exports.verStatus = (msg, params) => {
  let resposta = {
    tipo: "texto",
    mensagem: "Calma que já estamos preparando seu pedido.",
  };
  return resposta;
};
