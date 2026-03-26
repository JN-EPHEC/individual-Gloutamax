import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mon API Géniale",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'basic'
                }
            }
        }
    },
    apis: ["./src/routes/*.ts"],
}; 

export const swaggerSpec = swaggerJsdoc(swaggerOptions);