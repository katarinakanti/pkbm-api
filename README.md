# Naiv | API with Typescript

Install **Naiv Developer Tools** on your VSCode or VSCodium

- VSCode Extension Link: https://marketplace.visualstudio.com/items?itemName=NaivDeveloper.naiv-vscode-extension
- VSCodium Extension Link: https://open-vsx.org/extension/NaivDeveloper/naiv-vscode-extension


## Design Process

Before start writing API program:
1. Define your data schema, relationships, and constraints. A well-structured schema reduces technical debt later.
2. Define API endpoints and its request/response formats.

Take a look at our design example on `design` folder, it is simple and self-explain format.

Click **Open Editor** to modify the design or create a new file with extension `.naiv` on the same folder. All the design files inside `design` folder are connected and can cross-reference to each other.

## Generate API Types

After design process, compile the design into typescript language:

```bash
npm run codegen
```

it will create a new folder `types` with all generated typescript files. You should not modify the files since it will be regenerated later if you change the data or API design.

## Write API Implementation

On the API design you can see `alias` key followed by a function-like name, look at a simple api design below

```
api get /my-course {
  alias getMyCourse
  headers {
    authorization string required
  }
  query {
    limit number
    offset number
    q string
  }
  return {
    total number required
    data table.Course required
  } required
}
```

The design will be compiled into a typescript types with name:

```typescript
type T_getMyCourse
```

combination of `T_` + `getMyCourse`, same pattern apply for other API alias name.

Now you can implement a function for the API on the file `implementation/getMyCourse.ts` like below:

```typescript
// implementation/getMyCourse.ts

import { T_getMyCourse } from "../types/api/getMyCourse";

export const getMyCourse: T_getMyCourse = async req => {
  // 
}
```

You should place the function name inside folder `implementation` with exactly same file name with alias API name and also same for the `export const` name, otherwise the server will not recognize your API implementation.

## Run Server

Before running the server, make sure you already have configure you database connection correctly. Look at the **Database Migration Guide** for db configuration.

```bash
npm run build && npm start
```

The server will automatically put your implementation function as controller/logic process on each API endpoint.

## Database Migration Guide

Before running db migration, you need to setup your database credential on `.env` file, duplicate from `.env.example` if it doesnt exist.

### Generate Migration

```bash
npm run generate-migration migration/<Migration-File-Name>
```

This is an auto-generated migration provided by TypeORM, migration script will be automatically created on the folder `migration`. For more information please see TypeORM migration guide.

### Running Migration

After generating migration script file, run the migration to apply the changes to database

```bash
npm run migrate
```

## FAQ

### Where is the .env file?

You can copy the sample `.env.example` to `.env`.

### Where can I setup the database?

On the `.env` file

### How to change API program port?

On the `.env` file

### How to custom the ExpressJS middleware?

You can modify `index.ts` and access the ExpressJS instance from `server` variable.

```typescript
const server = new Server();
server.express?.use(...); // <-- access ExpressJS instance
```
