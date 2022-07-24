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

`WATSON_ASSISTANT_SOURCE_WORKSPACE_ID` represent the workspace id where your dialog tree will be **exported**.</br>
`WATSON_ASSISTANT_TARGET_WORKSPACE_ID` represent the workspace id where your dialog tree will be **imported** to.

To understand where `WATSON_API_KEY` and `WATSON_SERVICE_URL` should be used and where find your watson assistant credentials check [IBM Cloud Watson node SDK](https://github.com/watson-developer-cloud/node-sdk#assistant-v1).

## Usage
With your dialog tree created and your `.env` file ready, you will need to add the text `[ENTRYPOINT]` to the node that starts your dialog tree and then `[EXPORT]` in **all** the nodes you want to export with it. Then in the workspace that will receive the exported dialog tree add a **new node** named `[IMPORT]` **below the last node** of thw workspace.

Should be like the images below.</br>
**Export nodes**:</br>
![Export nodes](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/export_nodes.png?raw=true)</br></br>
**Import node**:</br>
![Import](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/import.png?raw=true)

After set your .env file, your entry point node, the import node and the nodes that will be exported, you just need to run the command:
```bash
npm start
```
Then acess the route `/dialogtree/add` and make a POST request.</br>
![Import](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/postman_request.png?raw=true)</br></br>
And simple as that **your entire dialog tree** is exported to a workspace to another without any heavy reworking! :)
![Import](https://github.com/PedroSales117/node-ts-watson-add-dialog-service/blob/feature/addCreateDialogTree/readme/updated_dialog_tree.png?raw=true)</br></br>


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.