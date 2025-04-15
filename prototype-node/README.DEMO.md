
# modOS - Protótipo de Gerenciador Modular

Este protótipo simula um sistema onde apenas os módulos necessários são carregados em tempo de execução.

## Como funciona?
- Os módulos estão na pasta `/modules` no formato `.zip`
- O `manager.js` analisa o `config.json` para decidir quais módulos descompactar
- Após 5 segundos, o módulo  removido da mem贸ria

## Requisitos
- Node.js
- npm install adm-zip

## Como rodar
```bash
npm install adm-zip
node manager.js
```

## Exemplo pr谩tico
O `config.json` est谩 configurado para carregar apenas o m贸dulo `audioPlayer`. Ele ser谩 extra铆do e, ap贸s 5 segundos, removido automaticamente.
