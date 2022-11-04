# Watson Dialog Service

• [Exportar](#exportar)
• [Atualizar](#atualizar)
• [Deletar](#deletar)
• [Jumps](#jumps)

| :warning: **Sempre** certifique-se de fazer um backup de suas workspaces antes de usar qualquer chamada de API do IBM Cloud SDK! |
| --- |

Este serviço oferece rotas para você exportar, atualizar ou deletar nós e fluxos completos sem precisar realizar nenhuma grande ou trabalhosa alteração diretamente no Watson Assistant. Abaixo você vai encontrar um passo-a-passo para cada rota, espero que seja-lhe util!

## Instalação

Use o gerenciador de pacotes npm para instalar as dependencias necessarias em sua maquina local.

```bash
npm install
```

Lembre-se de instalar tambem o compilador typescript e dentro do seu projeto configura-lo.

```bash
npm install -g typescript
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

`SOURCE` representa a workspace origem.
`TARGET` representa a workspace alvo.

Para entender onde `API_KEY` e `SERVICE_URL` devem ser usados corretamente ​​e onde encontrar suas credenciais do Watson Assistant, verifique [IBM Cloud Watson node SDK](https://github.com/watson-developer-cloud/node-sdk#assistant-v1 ).

## Exportar

<details> <summary> Ver mais... </summary>
Exporte uma árvore de diálogo inteira em uma workspace diferente a partir da qual a árvore foi originalmente criada.

## Uso

Com sua árvore de diálogo criada e seu arquivo `.env` pronto, você irá coletar o **dialog_node** do nó inicial da arvore que você quer exportar. Lembre-se de anota-lo em algum lugar.

Então rode estes comandos nesta ordem:

```bash
npm run build
```

```bash
npm start
```

Acessando a rota `/dialogtree/add` e realizando uma requisição **POST** com o body desta forma abaixo, onde `parentNodeId` é o nó em que se inicia o fluxo e `importNodeId` é o ultimo nó da arvore inteira de dialogo do Watson, neste exemplo sendo por padrão o `Anything else`:

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

</details></br>

## Atualizar

<details> <summary> Ver mais... </summary>

Para atualizar um nó especifico você utilizará:

.env

```.env
PORT=8080
WATSON_TARGET_WORKSPACE_ID=''
WATSON_TARGET_WORKSPACE_VERSION=''
WATSON_TARGET_WORKSPACE_API_KEY=''
WATSON_TARGET_WORKSPACE_SERVICE_URL=''
```

Rota: `nodes/update`

Metodo: `POST`

body:

```json
{
  "dialogNodeId": "",
  "toModifyData": "",
  "attributeToModifyName": ""
}
```

**dialogNodeId**: Id do nó de dialogo.</br></br>
**attributeToModifyName**: Nome do atributo a ser modificado.
<li>newContext</li>
<li>newDialogNode</li>
<li>newDescription</li>
<li>newConditions</li>
<li>newParent</li>
<li>newPreviousSibling</li>
<li>newOutput</li>
<li>newMetadata</li>
<li>newNextStep</li>
<li>newTitle</li>
<li>newType</li>
<li>newEventName</li>
<li>newVariable</li>
<li>newActions</li>
<li>newDigressIn</li>
<li>newDigressOut</li>
<li>newDigressOutSlots</li>
<li>newUserLabel</li>
<li>newDisambiguationOptOut</li>
<li>includeAudit</li></br>

**toModifyData**: Nova informação que será utilizada para atualizar o nó.</br>
<li>string</li>
<li>int</li>
<li>object</li>
<li>array</li></br></br>

Retorno:

```json
{
    "statusCode": "200",
}
```

</details></br>

## Deletar

<details> <summary> Ver mais... </summary>

Para deletar um nó especifico você utilizará:

.env

```.env
PORT=8080
WATSON_TARGET_WORKSPACE_ID=''
WATSON_TARGET_WORKSPACE_VERSION=''
WATSON_TARGET_WORKSPACE_API_KEY=''
WATSON_TARGET_WORKSPACE_SERVICE_URL=''
```

Rota: `nodes/delete`

Metodo: `DELETE`

body:

```json
{
  "dialogNodeId": ""
}
```

**dialogNodeId**: Id do nó de dialogo.</br></br>

Retorno:

```json
{
    "statusCode": "200",
}
```

</details></br>

## Jumps

<details> <summary> Ver mais... </summary>

Para validar jumps dentro de um fluxo especifico você utilizará:

.env

```.env
PORT=8080
WATSON_TARGET_WORKSPACE_ID=''
WATSON_TARGET_WORKSPACE_VERSION=''
WATSON_TARGET_WORKSPACE_API_KEY=''
WATSON_TARGET_WORKSPACE_SERVICE_URL=''
```

Rota: `nodes/jumps`

Metodo: `GET`

body:

```json
{
  "dialogNodesId": ""
}
```

**dialogNodesId**: Id do nó de dialogo.</br></br>

Retorno:

```json
{
    "status": 200,
    "body": {
        "dialogTreeJumpsDetails": [
            {
                "jump_details": {
                    "to": "node_1_1111111111111",
                    "from": {
                        "title": "Node Title",
                        "id": "node_1_1111111111111"
                    }
                }
            }
        ]
    }
}
```

</details></br>

Para feedbacks, sugestões ou duvidas por favor entre em contato por pedro.sales@compasso.com.br
