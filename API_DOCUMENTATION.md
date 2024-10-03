# Job Board API Documentation

This document outlines the endpoints and usage of the Job Board API.

## Base URL

All URLs referenced in the documentation have the following base:

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Send the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### User Authentication

#### Sign Up

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Auth required**: No
- **Data constraints**:

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]",
  "name": "[user's name]"
}
```

- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "user": { "id": 1, "email": "user@example.com", "name": "User Name" } }`

#### Sign In

- **URL**: `/auth/signin`
- **Method**: `POST`
- **Auth required**: No
- **Data constraints**:

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "user": { "id": 1, "email": "user@example.com", "name": "User Name" }, "token": "[JWT Token]" }`

### Jobs

#### Create a Job

- **URL**: `/jobs`
- **Method**: `POST`
- **Auth required**: Yes
- **Data constraints**:

```json
{
  "title": "[job title]",
  "description": "[job description]",
  "company": "[company name]",
  "location": "[job location]",
  "salary": "[salary amount]"
}
```

- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "id": 1, "title": "Software Engineer", ... }`

#### Get All Jobs

- **URL**: `/jobs`
- **Method**: `GET`
- **Auth required**: No
- **Success Response**:
  - **Code**: 200
  - **Content**: `[{ "id": 1, "title": "Software Engineer", ... }, ...]`

#### Get a Specific Job

- **URL**: `/jobs/:id`
- **Method**: `GET`
- **Auth required**: No
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "id": 1, "title": "Software Engineer", ... }`

#### Update a Job

- **URL**: `/jobs/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **Data constraints**: Same as Create a Job
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "id": 1, "title": "Updated Software Engineer", ... }`
- **Error Response**:
  - **Code**: 403
  - **Content**: `{ "error": "Unauthorized" }`

#### Delete a Job

- **URL**: `/jobs/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "id": 1, "title": "Deleted Software Engineer", ... }`
- **Error Response**:
  - **Code**: 403
  - **Content**: `{ "error": "Unauthorized" }`

## Error Responses

- **Condition**: If a request is made with invalid data or to a non-existent resource.
- **Code**: 400 BAD REQUEST
- **Content**: `{ "error": "[error message]" }`

- **Condition**: If a request is made without a valid authentication token.
- **Code**: 401 UNAUTHORIZED
- **Content**: `{ "error": "No token provided" }`

- **Condition**: If a request is made by an authenticated user to a resource they don't own.
- **Code**: 403 FORBIDDEN
- **Content**: `{ "error": "Unauthorized" }`

- **Condition**: If a request is made to a resource that doesn't exist.
- **Code**: 404 NOT FOUND
- **Content**: `{ "error": "Resource not found" }`
