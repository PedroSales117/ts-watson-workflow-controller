# Adicione uma árvore de diálogo inteira ao seu espaço de trabalho

Exporte uma árvore de diálogo inteira em uma workspace diferente a partir da qual a árvore foi originalmente criada.

| :warning: **Sempre** certifique-se de fazer um backup de suas workspaces antes de usar qualquer chamada de API do IBM Cloud SDK! |
| --- |

## Instalação

Use o gerenciador de pacotes npm para instalar as dependencias necessarias em sua maquina local.

```bash
npm install
```

Lembre-se de instalar tambem o compilador typescript e dentro do seu projeto configura-lo.
```bash
npm install -g typescript
```

```bash
tsc --init
```

Para poder usar essa aplicação você precisará criar um arquivo `.env` com as seguintes variáveis.

```.env
PORT=8080
WATSON_TARGET_WORKSPACE_ID=''
WATSON_TARGET_WORKSPACE_VERSION=''
WATSON_TARGET_WORKSPACE_API_KEY=''
WATSON_TARGET_WORKSPACE_SERVICE_URL=''

WATSON_SOURCE_WORKSPACE_ID=''
WATSON_SOURCE_WORKSPACE_VERSION=''
WATSON_SOURCE_WORKSPACE_API_KEY=''
WATSON_SOURCE_WORKSPACE_SERVICE_URL=''
```

`SOURCE` representa a workspace onde sua árvore de diálogo será **exportada**.
`TARGET` representa a workspace para onde sua árvore de diálogo será **importada**.

Para entender onde `API_KEY` e `SERVICE_URL` devem ser usados corretamente ​​e onde encontrar suas credenciais do Watson Assistant, verifique [IBM Cloud Watson node SDK](https://github.com/watson-developer-cloud/node-sdk#assistant-v1 ).

## Uso

Com sua árvore de diálogo criada e seu arquivo `.env` pronto, você irá coletar o **dialog_node** do nó inicial da arvore que você quer exportar. Lembre-se de anota-lo em algum lugar.

```bash
npm run build
```

```bash
npm start
```

Acessando a rota `/dialogtree/add` e realizando uma requisição **POST** com o body desta forma abaixo, onde `parentNodeId` é o nó em que se inicia o fluxo e `importNodeId` é o ultimo nó da sua arvore:

```json
{
    "parentNodeId": "node_9_9999999999",
    "importNodeId": "Anything else"
}
```

> se sua `target` workspace for igual a sua `source` workspace apenas não contendo este novo fluxo que deseja exportar, o fluxo será exportado no exato lugar que ele se encontra na `target` workspace.

| :warning: Lembre se que se jumps são realizados para nós que não estão sendo exportados, esta aplicação irá deleta-los para evitar problemas decorridos na exportação para `target` workspace(Essa validação não afeta o fluxo original na `source` workspace). |
| --- |

E simples assim **toda a sua árvore de diálogo** é exportada de uma workspace para outra sem nenhum retrabalho pesado! :)

## Erros

Quando o codigo do ultimo nó esta ausente na workspace de destino.</br>

```json
{
    "status":400,
    "error":"Import node not found"
}
```

Quando o codigo do parentNode não é encontrado na workspace de origem.</br>

```json
{
    "status": 400,
    "error": "Entry point node required"
}
```

Erros de árvore invalida e colisões ocorrerão quando alguns de seus nós de exportação estiverem mal definidos na workspace de origem ou já existirem na sua workspace de destino.</br>

```json
{
    "status": 400,
    "error": "Invalid tree detected. Dialog node 'node_1_1658504403239' is poorly defined. Check its parent or previous_sibling value.",
    "message": "Bad Request"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
