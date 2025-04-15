
# modOS - Protótipo de Gerenciador Modular

Este protótipo simula um sistema onde apenas os módulos necessários são carregados em tempo de execução.

## Como funciona?
- Os módulos estão na pasta `/modules` no formato `.zip`
- O `manager.js` analisa o `config.json` para decidir quais módulos descompactar
- Após 5 segundos, o módulo é removido da memória

## Requisitos
- Node.js
- npm install adm-zip

## Como rodar
```bash
npm install adm-zip
node manager.js
```

## Exemplo prático
O `config.json` está configurado para carregar apenas o módulo `audioPlayer`. Ele será extraído e, após 5 segundos, removido automaticamente.
