import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import swagger, { type StaticDocumentSpec } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify, { type FastifyError } from 'fastify';

import { ServerErrorType } from '#libs/enums/enums.js';
import { type ValidationError } from '#libs/exceptions/exceptions.js';
import { type Config } from '#libs/packages/config/config.js';
import { type Database } from '#libs/packages/database/database.js';
import { HTTPCode, HTTPError } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import {
  type ServerCommonErrorResponse,
  type ServerValidationErrorResponse,
  type ValidationSchema,
} from '#libs/types/types.js';

import {
  type ServerApplication,
  type ServerApplicationApi,
} from './libs/interfaces/interfaces.js';
import { type ServerApplicationRouteParameters } from './libs/types/types.js';

type Constructor = {
  title: string;
  config: Config;
  logger: Logger;
  database: Database;
  apis: ServerApplicationApi[];
};

class BaseServerApplication implements ServerApplication {
  private title: string;

  private config: Config;

  private logger: Logger;

  private database: Database;

  private apis: ServerApplicationApi[];

  private app: ReturnType<typeof Fastify>;

  public constructor({ title, config, logger, database, apis }: Constructor) {
    this.title = title;
    this.config = config;
    this.logger = logger;
    this.database = database;
    this.apis = apis;

    this.app = Fastify({
      ignoreTrailingSlash: true,
    });
  }

  public addRoute(parameters: ServerApplicationRouteParameters): void {
    const { path, method, handler, validation } = parameters;

    this.app.route({
      url: path,
      method,
      handler,
      schema: {
        body: validation?.body,
      },
    });

    this.logger.info(`Route: ${method} ${path} is registered`);
  }

  public addRoutes(parameters: ServerApplicationRouteParameters[]): void {
    for (const item of parameters) {
      this.addRoute(item);
    }
  }

  public initRoutes(): void {
    const routers = this.apis.flatMap((item) => item.routes);

    this.addRoutes(routers);
  }

  public async initMiddlewares(): Promise<void> {
    await Promise.all(
      this.apis.map(async (item) => {
        this.logger.info(
          `Generate swagger documentation for API ${item.version}`,
        );

        await this.app.register(swagger, {
          mode: 'static',
          specification: {
            document: item.generateDoc(
              this.title,
            ) as StaticDocumentSpec['document'],
          },
        });

        await this.app.register(swaggerUi, {
          routePrefix: `${item.version}/documentation`,
        });
      }),
    );
  }

  private async initServe(): Promise<void> {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../../public',
    );

    await this.app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/',
    });

    this.app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  }

  private initValidationCompiler(): void {
    this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
      return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
        return schema.validate(data, {
          abortEarly: false,
        });
      };
    });
  }

  private initErrorHandler(): void {
    this.app.setErrorHandler(
      (error: FastifyError | ValidationError, _request, replay) => {
        if ('isJoi' in error) {
          this.logger.error(`[Validation Error]: ${error.message}`);

          for (const item of error.details) {
            this.logger.error(`[${item.path.toString()}] — ${item.message}`);
          }

          const response: ServerValidationErrorResponse = {
            errorType: ServerErrorType.VALIDATION,
            message: error.message,
            details: error.details.map((item) => ({
              path: item.path,
              message: item.message,
            })),
          };

          return replay.status(HTTPCode.UNPROCESSED_ENTITY).send(response);
        }

        if (error instanceof HTTPError) {
          this.logger.error(`[HTTP Error]: ${error.status} – ${error.message}`);

          const response: ServerCommonErrorResponse = {
            errorType: ServerErrorType.COMMON,
            message: error.message,
          };

          return replay.status(error.status).send(response);
        }

        this.logger.error(error.message);

        const response: ServerCommonErrorResponse = {
          errorType: ServerErrorType.COMMON,
          message: error.message,
        };

        return replay.status(HTTPCode.INTERNAL_SERVER_ERROR).send(response);
      },
    );
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization…');

    await this.initServe();

    await this.initMiddlewares();

    this.initValidationCompiler();

    this.initErrorHandler();

    this.initRoutes();

    this.database.connect();

    try {
      await this.app.listen({
        port: this.config.ENV.APP.PORT,
        host: this.config.ENV.APP.HOST,
      });

      this.logger.info(
        `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
          this.config.ENV.APP.ENVIRONMENT as string
        }.`,
      );
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message, {
          cause: error.cause,
          stack: error.stack,
        });
      }

      throw error;
    }
  }
}

export { BaseServerApplication };
