
const apiKey = '96002890f4750ceecd765ec8'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}`;

const fromCurrencyEl = document.getElementById('fromCurrency');
const toCurrencyEl = document.getElementById('toCurrency');
const amountEl = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultEl = document.getElementById('result');

// Inicializa a camada de dados (dataLayer) para o GTM
window.dataLayer = window.dataLayer || [];

// Função para popular os seletores de moeda
async function populateCurrencies() {
    try {
        const response = await fetch(`${apiUrl}/codes`);
        const data = await response.json();
        const currencies = data.supported_codes;

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency[0];
            option1.textContent = `${currency[0]} - ${currency[1]}`;
            fromCurrencyEl.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency[0];
            option2.textContent = `${currency[0]} - ${currency[1]}`;
            toCurrencyEl.appendChild(option2);
        });

        // Valores padrão
        fromCurrencyEl.value = 'BRL';
        toCurrencyEl.value = 'USD';
    } catch (error) {
        console.error("Erro ao carregar moedas:", error);
        resultEl.textContent = "Erro ao carregar lista de moedas.";
    }
}

// Função para realizar a conversão
async function convertCurrency() {
    const amount = amountEl.value;
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;

    if (amount === '' || amount <= 0) {
        resultEl.textContent = "Por favor, insira um valor válido.";
        return;
    }

    try {
        resultEl.textContent = "Convertendo...";
        const response = await fetch(`${apiUrl}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();

        if (data.result === 'success') {
            const conversionResult = data.conversion_result;
            resultEl.textContent = `${amount} ${fromCurrency} = ${conversionResult.toFixed(2)} ${toCurrency}`;

            const amountToPush = parseFloat(amount);
            console.log("Valor do input:", amount, "Valor após parseFloat:", amountToPush); 

            window.dataLayer.push({
                'event': 'currency_conversion',
                'from_currency': fromCurrency,
                'to_currency': toCurrency,
                'conversion_amount': amountToPush
            });
            
            console.log('Evento currency_conversion enviado para o dataLayer:', {from_currency: fromCurrency, to_currency: toCurrency, conversion_amount: parseFloat(amountToPush)});

        } else {
            resultEl.textContent = 'Erro ao converter. Verifique as moedas selecionadas.';
        }
    } catch (error) {
        console.error("Erro na conversão:", error);
        resultEl.textContent = "Erro ao se conectar com a API de câmbio.";
    }
}


convertBtn.addEventListener('click', convertCurrency);
document.addEventListener('DOMContentLoaded', populateCurrencies);

// =======================================================================
// CÓDIGO PARA TESTE DE VOLUME (NÃO EXECUTA SOZINHO)
// =======================================================================

// Função que gera um único evento de conversão falso
function generateRandomEvent() {
  const currencies = ['USD', 'EUR', 'BRL', 'JPY', 'GBP', 'CAD', 'AUD', 'CHF'];
  let fromCurrency = currencies[Math.floor(Math.random() * currencies.length)];
  let toCurrency;
  do {
    toCurrency = currencies[Math.floor(Math.random() * currencies.length)];
  } while (toCurrency === fromCurrency);

  const randomAmount = parseFloat((Math.random() * 4999 + 1).toFixed(2));

  const eventData = {
    'event': 'currency_conversion',
    'from_currency': fromCurrency,
    'to_currency': toCurrency,
    'conversion_amount': randomAmount
  };

  window.dataLayer.push(eventData);
  console.log('Evento Falso Gerado:', eventData);
}

/**
 * Função para iniciar o disparo de múltiplos eventos falsos.
 * Chamar esta função pelo console do navegador para iniciar o teste.
 * @param {number} totalEvents - O número total de eventos a serem gerados.
 * @param {number} delayMs - O intervalo em milissegundos entre cada evento.
 */
function iniciarTesteDeVolume(totalEvents = 50, delayMs = 2000) {
  console.log(`--- Iniciando disparo de ${totalEvents} eventos falsos com intervalo de ${delayMs}ms ---`);
  for (let i = 0; i < totalEvents; i++) {
    setTimeout(generateRandomEvent, i * delayMs);
  }
  setTimeout(() => {
    console.log(`--- Disparo de ${totalEvents} eventos concluído! ---`);
  }, totalEvents * delayMs);
}