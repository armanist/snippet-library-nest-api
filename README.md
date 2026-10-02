# Snippet Library Nest API

A learning project built with NestJS and TypeScript. It provides a REST API for storing code snippets in a local SQLite database.

## Features

- List all snippets
- Fetch one snippet by ID
- Create a snippet
- Delete a snippet
- Validate incoming request data
- Persist data with SQLite and TypeORM
- Test requests with Bruno

## Requirements

- Node.js
- npm

## Setup

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run start:dev
```

The API is available at:

```text
http://localhost:3000
```

The first start creates `snippets.sqlite` in the project root. This local database file is ignored by Git.

## API

### List snippets

```http
GET /snippets
```

### Get one snippet

```http
GET /snippets/:id
```

### Create a snippet

```http
POST /snippets
Content-Type: application/json
```

Request body:

```json
{
  "title": "Array filter",
  "language": "typescript",
  "code": "const active = users.filter((user) => user.active);",
  "tags": ["typescript", "array"]
}
```

Supported languages are:

```text
php
javascript
typescript
html
css
```

### Delete a snippet

```http
DELETE /snippets/:id
```

A successful deletion returns:

```text
204 No Content
```

## Bruno Collection

The Bruno-importable collection is located at:

```text
bruno/snippet-library-nest-api.postman_collection.json
```

In Bruno, choose **Import** and select that file. The collection includes requests for listing, reading, creating, and deleting snippets.

## Project Structure

```text
src/
  main.ts
  app.module.ts
  snippets/
    create-snippet.dto.ts
    snippet.entity.ts
    snippet.ts
    snippets.controller.ts
    snippets.service.ts
bruno/
  snippet-library-nest-api.postman_collection.json
snippets.sqlite
```

## Useful Commands

```powershell
# Development server with watch mode
npm run start:dev

# Production build
npm run build

# Start the compiled application
npm run start:prod

# Format source files
npm run format

# Lint source files
npm run lint
```
