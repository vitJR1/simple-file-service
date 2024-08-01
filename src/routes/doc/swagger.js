import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Simple file service",
    version: "1.0.0",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token in the format: Bearer {token}",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
