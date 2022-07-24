# Add a entire dialog tree to your workspace

Export an entire dialog tree in a different workspace from which the tree was created.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/ibm-watson) to install ibm watson to your local machine.

```bash
npm install ibm-watson
```
To be able to use this application you will need to create a `.env` file with the following variables.

```.env
PORT=8080
WATSON_API_KEY=''
WATSON_ASSISTANT_TARGET_WORKSPACE_ID=''
WATSON_ASSISTANT_SOURCE_WORKSPACE_ID=''
WATSON_SERVICE_URL=''
```

`WATSON_ASSISTANT_SOURCE_WORKSPACE_ID` is the id of the workspace where your dialog tree will be exported.
`WATSON_ASSISTANT_TARGET_WORKSPACE_ID` is the id of the workspace where your dialog tree will be imported.

To configured the connection to your ibm watson assistant, check [IBM Cloud Watson node SDK](https://github.com/watson-developer-cloud/node-sdk#assistant-v1).

## Usage
With your dialog tree created and your `.env` file ready, you will need to add the text `[ENTRYPOINT]` to the node that starts your dialog tree and then `[EXPORT]` in **all** the nodes you want to export with it. Then in the workspace that will receive the exported dialog tree add a **new node** named `[IMPORT]` **below the last node** of thw workspace.

Should be like the images below.
**Export nodes**:
![Export nodes](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/export_nodes.png?raw=true)</br></br>
**Import node**:
![Import](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/import.png?raw=true)

```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.