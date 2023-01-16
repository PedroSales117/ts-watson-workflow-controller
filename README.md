# Watson Dialog Service

Este serviço oferece rotas para você exportar, atualizar ou deletar nós e fluxos completos sem precisar realizar nenhuma grande ou trabalhosa alteração diretamente no Watson Assistant. Abaixo você vai encontrar um passo-a-passo para cada rota, espero que seja-lhe util!

- [Exportar](#exportar)
- [Atualizar](#atualizar)
- [Deletar](#deletar)
- [Criar](#criar)
- [Verificar jumps](#verificar-jumps)

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

Então rode estes comandos nesta ordem:

```bash
npm run build
```

```bash
npm start
```

Se tudo estiver ok, você receberá em seu terminal esta mensagem:

```powershell
Listen on https://localhost:8080
```

**https://localhost:8080** será sua URL padrão para acessar as rotas listadas abaixo.

## Árvore de diálogo

<details><summary> Ver mais... </summary>

## Exportar

<details> <summary> Ver mais... </summary>

| :memo: Essa rota utiliza as credencias **TARGET** do seu `.env` |
| --- |

Exporte uma árvore de diálogo inteira em uma workspace diferente a partir da qual a árvore foi originalmente criada.

### ROTA
`/dialogtree/add`

### METODO
`POST`

### BODY

```json
{
    "parentNodeId": "node_9_9999999999",
    "importNodeId": "Anything else"
}
```

- **parentNodeId**: Nó em que se inicia o fluxo
- **importNodeId**: Ultimo nó de dialogo de sua skill (sendo por padrão o _Anything else_)

### RETORNO

```json
{
    "status": 200,
    "body": "nodes add to workspace: <Nome da workspace>"
}
```

> Se sua `target` workspace for igual a sua `source` workspace apenas não possuindo o novo fluxo que deseja exportar, o fluxo será exportado no exato lugar que ele se encontra na `target` workspace.

| :warning: Lembre se que se jumps são realizados para nós que não estão sendo exportados, esta aplicação irá deleta-los para evitar problemas decorridos na exportação para `target` workspace(Essa validação não afeta o fluxo original na `source` workspace). |
| --- |

E simples assim **toda a sua árvore de diálogo** é exportada de uma workspace para outra sem nenhum retrabalho pesado!

## ERROS

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

Erros de árvore invalida e colisões ocorrerão quando alguns de seus nós de exportação estiverem mal definidos na source workspace ou já existirem na sua target workspace.</br>

```json
{
    "status": 400,
    "error": "Invalid tree detected. Dialog node 'node_1_121212121212' is poorly defined. Check its parent or previous_sibling value.",
    "message": "Bad Request"
}
```

</details></br>

## Verificar jumps

<details> <summary> Ver mais... </summary>

| :memo: Essa rota utiliza as credencias **TARGET** do seu `.env` |
| --- |

Para verificar jumps dentro de um fluxo especifico você utilizará:

### ROTA
`nodes/jumps`

### METODO
`GET`

### BODY

```json
{
  "dialogNodesId": ""
}
```

**dialogNodesId**: Id do nó de dialogo.</br></br>

### RETORNO

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

</details>

## Nós de diálogo

<details><summary> Ver mais... </summary>

## Atualizar

<details> <summary> Ver mais... </summary>

| :memo: Essa rota utiliza as credencias **TARGET** do seu `.env` |
| --- |

Para atualizar um nó especifico você utilizará:

### ROTA
`nodes/update`

### METODO
`POST`

### BODY

```json
{
  "dialogNodeId": "",
  "toModifyData": "",
  "attributeToModifyName": ""
}
```

**dialogNodeId**: Id do nó de dialogo.

**attributeToModifyName**: Nome do atributo a ser modificado.

- newContext
- newDialogNode
- newDescription
- newConditions
- newParent
- newPreviousSibling
- newOutput
- newMetadata
- newNextStep
- newTitle
- newType
- newEventName
- newVariable
- newActions
- newDigressIn
- newDigressOut
- newDigressOutSlots
- newUserLabel
- newDisambiguationOptOut
- includeAudit

**toModifyData**: Nova informação que será utilizada para atualizar o nó.

- string
- int
- object
- array

### RETORNO

```json
{
    "statusCode": "200",
}
```

</details>

## Deletar

<details><summary> Ver mais... </summary>

| :memo: Essa rota utiliza as credencias **TARGET** do seu `.env` |
| --- |

Para deletar um nó especifico você utilizará:

### ROTA
`nodes/delete`

### METODO
`DELETE`

### BODY

```json
{
  "dialogNodeId": ""
}
```

**dialogNodeId**: Id do nó de dialogo.</br></br>

### RETORNO:

```json
{
    "statusCode": "200",
}
```

</details></br>

## Criar

<details> <summary> Ver mais... </summary>

| :memo: Essa rota utiliza as credencias **TARGET** do seu `.env` |
| --- |

Para criar um nó de dialogo você utilizará:

### ROTA
`nodes/create`

### METODO
`POST`

### BODY

```json
{
    "dialogNodeData": {
        "conditions": "false",
        "title": "Node automatic created",
        "type": "standard"
    }
}
```

**dialogNodeData**: Propriedades escolhidas para criar o seu nó de diálogo.

- conditions
- title
- type
- output
- description
- parent
- previousSibling
- context
- metadata
- nextStep
- eventName
- variable
- actions
- digressIn
- digressOut
- digressOutSlots
- userLabel
- disambiguationOptOut
- includeAudit

### RETORNO:

```json
{
    "status": 200,
    "body": {
        "type": "standard",
        "title": "Node automatic created",
        "conditions": "false",
        "dialog_node": "node_6c9da678-4b0e-45a6-9a65-0ddf27f4814f"
    }
}
```

> `dialog_node` é gerado automaticamente via UUID.

</details></br>

</details>

Para feedbacks, sugestões ou duvidas por favor entre em contato por pedro.sales@compasso.com.br
