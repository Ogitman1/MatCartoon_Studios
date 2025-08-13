// Substitua pelos links reais de pagamento criados no Mercado Pago
const checkoutLinks = {
    BASICO: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=123456",
    INTERMEDIARIO: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=654321",
    AVANCADO: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=112233"
  };

  function checkout(plan) {
    const url = checkoutLinks[plan];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Link de pagamento não encontrado.");
    }
  }