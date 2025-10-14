# Conversor de Moedas com Tagueamento Avançado (GA4 & GTM)

## 📖 Sobre o Projeto

Este projeto foi desenvolvido como resposta a um **desafio técnico** para um processo seletivo na área de Digital Analytics. O objetivo principal não foi apenas criar uma aplicação front-end funcional, mas construir um **case completo que demonstra a jornada de um dado**: desde a sua geração no clique de um usuário até a sua visualização em um dashboard de Business Intelligence.

A aplicação é um conversor de moedas simples que utiliza uma API externa para taxas de câmbio, mas seu verdadeiro valor está na arquitetura de rastreamento e mensuração de dados implementada por trás da interface.

[![Ver Projeto Ao Vivo](https://img.shields.io/badge/Acessar_Aplicação-007BFF?style=for-the-badge&logo=rocket&logoColor=white)](https://conversor-flame.vercel.app/)

**Status do Projeto:** Concluído ✔️

---

## 📊 Dashboard de Análise

Os dados coletados são centralizados e exibidos em um dashboard interativo no Looker Studio, permitindo a análise de KPIs e o comportamento do usuário. Para uma experiência completa, interaja com os filtros de data e explore os gráficos.

[![Ver Dashboard Interativo](https://img.shields.io/badge/Visualizar_Dashboard-8A2BE2?style=for-the-badge&logo=looker&logoColor=white)](https://lookerstudio.google.com/reporting/d336720b-76dc-4746-a723-a2b06b950731)

---

## ✨ Principais Funcionalidades

* **Conversão de Moedas:** Interface limpa para conversão entre centenas de moedas.
* **Taxas de Câmbio em Tempo Real:** Integração com a [ExchangeRate-API](https://www.exchangerate-api.com/) para garantir dados atualizados.
* **Tagueamento Robusto:** Cada conversão é rastreada como um evento personalizado no Google Tag Manager.
* **Mensuração de Dados:** Os eventos e seus parâmetros são enviados e processados pelo Google Analytics 4.
* **Visualização de Dados:** Um dashboard completo no Looker Studio para análise de tendências e padrões de uso.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

| Categoria                | Tecnologia                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Front-End** | `HTML5`, `CSS3`, `JavaScript (ES6+)`                                                                        |
| **Analytics & Tagueamento** | `Google Tag Manager (GTM)`, `Google Analytics 4 (GA4)`                                                      |
| **BI & Visualização** | `Looker Studio`                                                                                             |
| **API** | `ExchangeRate-API`                                                                                          |

---

## 🔗 Arquitetura e Fluxo do Dado

A jornada do dado desde a interação do usuário até o dashboard segue 5 etapas principais:

1.  **Ação do Usuário (Front-End)**
    * O usuário insere um valor, seleciona as moedas e clica no botão "Converter".

2.  **Captura do Evento (JavaScript & `dataLayer`)**
    * A função `convertCurrency()` em `script.js` valida a ação e, se bem-sucedida, "empurra" um objeto para a camada de dados.
    ```javascript
    window.dataLayer.push({
        'event': 'currency_conversion',
        'from_currency': 'BRL',
        'to_currency': 'USD',
        'value': 150.75 
    });
    ```

3.  **Coleta e Distribuição (Google Tag Manager)**
    * **Acionador (Trigger):** Um acionador de "Evento Personalizado" ouve o evento `currency_conversion`.
    * **Variáveis (Variables):** Variáveis do tipo "Camada de Dados" capturam os valores de `from_currency`, `to_currency` e `value`.
    * **Tag:** Uma tag do tipo "Google Analytics: Evento do GA4" é disparada, empacotando os dados capturados pelas variáveis e enviando-os para o GA4.

4.  **Armazenamento e Processamento (Google Analytics 4)**
    * O GA4 recebe os dados do evento.
    * **Dimensões Personalizadas** ("Moeda de Origem" e "Moeda de Destino") foram configuradas para permitir a análise dos parâmetros `from_currency` e `to_currency`.
    * O parâmetro `value` é processado automaticamente pela métrica padrão "Valor do evento".

5.  **Visualização (Looker Studio)**
    * O Looker Studio se conecta à fonte de dados do GA4 e utiliza as dimensões e métricas para popular os gráficos e tabelas do dashboard interativo.

---

## 🚀 Como Executar o Projeto Localmente

Para executar este projeto em sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git)
    ```

2.  **Obtenha uma Chave de API:**
    * Crie uma conta gratuita no site [ExchangeRate-API](https://www.exchangerate-api.com/) para obter sua API Key.

3.  **Configure o `script.js`:**
    * Abra o arquivo `script.js`.
    * Na primeira linha, substitua a string `'SUA_CHAVE_DE_API'` pela chave que você obteve.

4.  **Configure o Google Tag Manager:**
    * Abra o arquivo `index.html`.
    * Substitua os placeholders `GTM-XXXXXXX` pelos snippets do seu próprio contêiner do GTM.

5.  **Abra no navegador:**
    * Abra o arquivo `index.html` em seu navegador de preferência.

---

## 👤 Autor

Projeto desenvolvido com dedicação por **[Seu Nome Aqui]**.

Vamos nos conectar!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francisco-dev/)

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
