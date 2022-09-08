import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: "1.0.0",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
        servers: [{
            url: "http://localhost:3000"
        }],

    },
    apis: ["./src/module/User/user.routes.ts", "./src/module/Authentication/auth.routes.ts"]
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app: Express, port: number) => {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in JSON format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
}

export default swaggerDocs