const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 👉 Insira aqui o seu Access Token do Mercado Pago
mercadopago.configure({
  access_token: "TESTUSER1798563799"
});

// Criação de preferência de pagamento via API
app.post('/create_preference', async (req, res) => {
  const { plano } = req.body;

  // Simples simulação de planos
  const planos = {
    BASICO: { title: "Plano Básico", price: 690 },
    INTERMEDIARIO: { title: "Plano Intermediário", price: 1490 },
    AVANCADO: { title: "Plano Avançado", price: 2490 }
  };

  const planoSelecionado = planos[plano];

  if (!planoSelecionado) {
    return res.status(400).json({ error: 'Plano inválido.' });
  }

  const preference = {
    items: [
      {
        title: planoSelecionado.title,
        quantity: 1,
        currency_id: "BRL",
        unit_price: planoSelecionado.price
      }
    ],
    back_urls: {
      success: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_modo_de_teste',
      failure: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento',
      pending: 'https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/receber-pagamentos/integrar-o-checkout#bookmark_status_de_pagamento'
    },
    auto_return: "approved"
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar preferência.' });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
