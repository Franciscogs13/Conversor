
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

            // Enviamos um evento para a camada de dados (dataLayer)
            window.dataLayer.push({
                'event': 'currency_conversion', // Nome do evento personalizado
                'from_currency': fromCurrency,
                'to_currency': toCurrency,
                'conversion_amount': parseFloat(amount)
            });
            
            console.log('Evento currency_conversion enviado para o dataLayer:', {from_currency: fromCurrency, to_currency: toCurrency, conversion_amount: parseFloat(amount)});

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