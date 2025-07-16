# Bate-Papo UOL

Este projeto é um bate-papo funcional inspirado no clássico Bate-Papo UOL, desenvolvido como parte do curso de desenvolvimento front-end com foco em JavaScript puro. O projeto simula uma sala de bate-papo em tempo real com mensagens públicas e privadas.

🔗 **Acesse o projeto online**:  
👉 [bartolomeusantos072.github.io/batepapo-uol](https://bartolomeusantos072.github.io/batepapo-uol/)

---

## 📱 Layout

O layout foi baseado no [Figma fornecido pelo curso](https://www.figma.com/file/eviXSw3MnQVphvpalRT78c/Chat-UOL?node-id=0%3A1) e adaptado exclusivamente para dispositivos **mobile**.

---

## 🚀 Funcionalidades

- Entrada na sala com nome único via `prompt`
- Exibição de mensagens com rolagem automática
- Atualização de mensagens a cada 3 segundos
- Envio de mensagens com remetente e destinatário
- Manutenção da presença do usuário com ping a cada 5 segundos
- Diferenciação visual de mensagens:
  - Mensagens de status (entrou/saiu)
  - Mensagens públicas
  - Mensagens reservadas (privadas) – visíveis somente ao destinatário

---

## ✅ Requisitos Atendidos

- [x] Uso de **JavaScript puro**, sem bibliotecas externas
- [x] Layout para **dispositivos móveis**
- [x] **Mensagens públicas e privadas**
- [x] Envio e atualização de mensagens
- [x] Cadastro de nome com verificação de duplicidade
- [x] Ping de presença no servidor a cada 5 segundos
- [x] Scroll automático no chat
- [x] Projeto versionado com **Git e GitHub**
- [x] Elementos com `data-identifier` para correção automática

---

## 🧪 Requisitos Bônus (não implementados)

- [ ] Tela inicial com formulário ao invés de `prompt`
- [ ] Lista de participantes ativos
- [ ] Escolha de destinatário e visibilidade da mensagem
- [ ] Envio de mensagem via tecla `Enter`

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- API do Bate-Papo (fornecida pelo curso)

---

## 📂 Organização

O projeto foi desenvolvido na pasta:  
`projeto5-batepapo-uol`

Commits realizados a cada funcionalidade implementada, seguindo boas práticas de versionamento.

---

## 🧠 Aprendizados

- Comunicação com APIs usando `fetch`
- Manipulação de DOM em tempo real
- Controle de erros em requisições HTTP
- Lógica de rolagem automática
- Uso de `setInterval` para atualização e manutenção de presença
- Estruturação de projetos JS sem frameworks

---

## 🔗 API

O projeto utiliza a seguinte API para comunicação com o servidor:  
[API Bate-Papo UOL - Documentação](https://www.notion.so/Bate-Papo-UOL-API-aacafe86d6334133b497b6c47a724b1c?pvs=21)

---

## ✍️ Autor

Feito com 💻 por **Bartolomeu Santos**  
[GitHub](https://github.com/bartolomeusantos072)

---
