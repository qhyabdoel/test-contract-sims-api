// config/swagger.js
const { format } = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Contract SIMS PPOB",
      version: "1.0.0",
      description: "Documentation for Take Home Test API",
    },
  },
  apis: [], // No need for specific paths here since we define docs below
};

const swaggerSpec = swaggerJsdoc(options);

swaggerSpec.components = {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

swaggerSpec.paths = {
  "/register": {
    post: {
      tags: ["1. Module Membership"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", description: "Email of the user" },
                password: {
                  type: "string",
                  description: "Password of the user",
                },
                first_name: {
                  type: "string",
                  description: "First name of the user",
                },
                last_name: {
                  type: "string",
                  description: "Last name of the user",
                },
              },
            },
            example: {
              email: "user@nutech-integrasi.com",
              first_name: "User",
              last_name: "Nutech",
              password: "abcdef1234",
            },
          },
        },
      },
      responses: {
        201: { description: "Request successfully" },
        400: { description: "Bad reques" },
        500: { description: "Server error" },
      },
    },
  },
  "/login": {
    post: {
      tags: ["1. Module Membership"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", description: "Email of the user" },
                password: {
                  type: "string",
                  description: "Password of the user",
                },
              },
            },
            example: {
              email: "user@nutech-integrasi.com",
              password: "abcdef1234",
            },
          },
        },
      },
      responses: {
        200: { description: "Request successfully" },
        400: { description: "Bad reques" },
        500: { description: "Server error" },
      },
    },
  },
  "/profile": {
    get: {
      tags: ["1. Module Membership"],
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },
  "/profile/image": {
    put: {
      tags: ["1. Module Membership"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
