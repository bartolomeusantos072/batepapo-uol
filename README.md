# 📱 Bate-Papo UOL

**Projeto 5** do curso Driven — um chat em tempo real com JavaScript puro, inspirado no tradicional Bate-Papo UOL, com interface própria para mobile.

[📂 Repositório no GitHub](https://github.com/bartolomeusantos072/batepapo-uol)

---

## 🧠 Sobre

Este projeto implementa um chat funcional:

* Nome único por usuário
* Mensagens públicas, privadas (reservadamente) e de status (entradas/saídas)
* Atualização automática do feed de mensagens
* Scroll automático até a última mensagem
* "Heartbeat" para manter presença ativa no chat
* Responsivo para dispositivos móveis

A API utilizada segue especificação da **Bate-Papo UOL API** no Notion. A versão utilizada é diferenciada do chat oficial da UOL e não utiliza o layout original.

---

## 🚩 Status do Repositório

| Requisito                                 | Status |
| ----------------------------------------- | :----: |
| JavaScript puro (sem libs)                |    ✅   |
| Versionamento com Git + GitHub            |    ✅   |
| Layout mobile conforme Figma              |    ✅   |
| `prompt` de registro com nome             |    ✅   |
| Envio para API de registro de usuário     |    ✅   |
| Atualização de mensagens a cada 3s        |    ✅   |
| Scroll automático                         |    ✅   |
| Envio e classificação (público/reservado) |    ✅   |
| "Heartbeat" a cada 5s                     |    ✅   |
| Atributos `data-identifier` para correção |    ✅   |

### Bônus (não implementados)

* Menu lateral de participantes
* Tela de entrada customizada
* Envio com tecla Enter
* Filtro de mensagens privadas por destinatário

---

## 🎯 Recursos

* **JavaScript puro** para lógica e manipulação DOM
* Ferramentas nativas: `fetch`, `setInterval`, `scrollIntoView`, `prompt`
* API REST da Bate-Papo UOL (via Notion)
* HTML e CSS responsivos sem frameworks

---

## 🛠️ Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/bartolomeusantos072/projeto5-batepapo-uol.git
   cd projeto5-batepapo-uol
   ```
2. Abra `index.html` no navegador.
3. Digite seu nome no prompt e comece a conversar!

---

## ✅ Identificadores para correção automatizada

* Mensagens: `<div ... data-identifier="message">`
* Botão de envio de mensagem: `data-identifier="send-message"`
* *(Para bônus)* Participantes: `data-identifier="participant"`
* *(Para bônus)* Visibilidade: `data-identifier="visibility"`
* *(Para bônus)* Input nome: `data-identifier="enter-name"`
* *(Para bônus)* Botão começar: `data-identifier="start"`

---

## 📥 Deploy

Você pode hospedar no GitHub Pages:

1. Vá até Settings → Pages.
2. Selecione a branch `main` e `/root` como pasta.
3. Publicação estará disponível em `https://bartolomeusantos072.github.io/projeto5-batepapo-uol/`

---

## 🎓 Aprendizados

* Consumo de APIs REST com JS
* Atualização constante de dados na UI
* Scroll dinâmico com `scrollIntoView`
* Tratamento de erros da API
* Layout responsivo para mobile

---

## 🛎 Próximos passos

* Implementar menu de participantes e filtro de destinatário
* Substituir `prompt` por tela de login customizada
* Permitir envio de mensagem com tecla Enter

---

## 👤 Autor

**Bartolomeu Santos**
[GitHub](https://github.com/bartolomeusantos072) • contato pessoal
