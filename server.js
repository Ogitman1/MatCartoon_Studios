// gerarLinks.js
import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Configurando o client MercadoPagoConfig com o acessToken do cliente teste
const client = new MercadoPagoConfig({
  accessToken: 'TESTUSER687697344'
});
const app = express();
app.use(cors());
//Array de dicionário com plano e valor
const planos = [
  { nome: 'BASICO', valor: 800 },
  { nome: 'INTERMEDIARIO', valor: 1490 },
  { nome: 'AVANCADO', valor: 2490 }
];
// Usa a classe Preference com o cliente
const preference = new Preference(client);
// Rota para gerar os links
app.get('/gerar-links', async (req, res) => {
  try {
    const links = [];
    //loop do array de dicionários com propriedades de nome dos pacotes e valores
    for (const plano of planos) {
    //dicionário preference com propiedade items[{}]
    
      const response = await preference.create({
        //criação do array de dicionários com os indices de planos
        items: [{
          title: plano.nome,
          unit_price: plano.valor,
          quantity: 1
        }],
        //urls de request response
        back_urls: {
          //requisiçaõ de sucesso
          success: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_modo_de_teste',
          //requisição de falha
          failure: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento',
          //requisição pendente
          pending: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento'
        },
        auto_return: 'approved'
    })
      //adiciona o nome do plano na propriedade plano
      //adiciona esse links em formato na propriedade url com response.body.init_point
      links.push({ plano: plano.nome, url: response.body.init_point });
    }

    res.json(links);
  } catch (error) {
    console.error('Erro ao gerar links:', error);
    res.status(500).json({ error: 'Não foi possível gerar os links' });
  }
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


// gerarLinks.js
/*import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: 'TESTUSER1798563799'
});

const planos = [
  { nome: 'BASICO', valor: 800 },
  { nome: 'INTERMEDIARIO', valor: 1490},
  { nome: 'AVANCADO', valor: 2490 }
];

(async () => {
  for (const plano of planos) {
    const preference = {
      items: [{
        title: plano.nome,
        unit_price: plano.valor,
        quantity: 1
      }],
      back_urls: { 
        success: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_modo_de_teste',
        failure: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento',
        pending: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    console.log(`${plano.nome}: ${response.body.init_point}`);
  }
})();*/