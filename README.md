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
PORTA=8080
WATSON_API_KEY=''
WATSON_ASSISTANT_TARGET_WORKSPACE_ID=''
WATSON_ASSISTANT_SOURCE_WORKSPACE_ID=''
WATSON_SERVICE_URL=''
```

`WATSON_ASSISTANT_SOURCE_WORKSPACE_ID` representa o id da workspace onde sua árvore de diálogo será **exportada** que chamaremos de source.
`WATSON_ASSISTANT_TARGET_WORKSPACE_ID` representa o id da workspace para onde sua árvore de diálogo será **importada** que chamaremos de target.

Para entender onde `WATSON_API_KEY` e `WATSON_SERVICE_URL` devem ser usados corretamente ​​e onde encontrar suas credenciais do Watson Assistant, verifique [IBM Cloud Watson node SDK](https://github.com/watson-developer-cloud/node-sdk#assistant-v1 ).

## Uso

Com sua árvore de diálogo criada e seu arquivo `.env` pronto, você precisará adicionar o texto `[ENTRYPOINT]` ao nó que inicia sua árvore de diálogo e então `[EXPORT]` em **todos** os nós que você deseja exportar com ele. Então, na workspace que receberá a árvore de diálogo exportada, adicione um **novo nó** chamado `[IMPORT]` **abaixo** do último nó da área de trabalho (por exemplo, nó Qualquer outra coisa). Deve ser como as imagens abaixo.
**Source workspace(que envia o fluxo)**:
![Exportar nós](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/export_nodes.png?raw=true)
**Target workspace(que recebe o fluxo)**:
![Importar](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/import.png?raw=true)

Após definir seu arquivo `.env`, seu `entry point node`, o `import node` e os `nodes que serão exportados`, você precisa executar o comando:

```bash
npm início
```

Acessando a rota `/dialogtree/add` e fazendo a requisição **POST**.</br>
![Importar](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/postman_request.png?raw=true)
E simples assim **toda a sua árvore de diálogo** é exportada de um espaço de trabalho para outro sem nenhum retrabalho pesado! :)
![Importar](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/updated_dialog_tree.png?raw=true)

## Erros

Quando o texto `[IMPORT]` está mal definido na workspace de destino.</br>

```json
{
    "status":400,
    "error":"Import node not found"
}
```

Quando o texto do `[ENTRYPOINT]` está mal definido no espaço de trabalho de origem.</br>

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
