import { APIPath, ExceptionMessage } from '#libs/enums/enums.js';
import { JournalError } from '#libs/exceptions/exceptions.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { type JournalEntryService } from './journal-entry.service.js';
import { JournalApiPath } from './libs/enums/enums.js';
import {
  type EntitiesFilteringDto,
  type JournalEntryCreateRequestDto,
} from './libs/types/types.js';
import {
  createJournalEntryValidationSchema,
  entitiesFilteringQueryValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Journal Entry:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *          title:
 *            type: string
 *            maxLength: 255
 *          text:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
 *      Unprocessable Journal Entity:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
 *          details:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                path:
 *                  type: array
 *                  items:
 *                      - type: string
 *                message:
 *                  type: string
 */

class JournalEntryController extends BaseController {
  private journalEntryService: JournalEntryService;

  public constructor(logger: Logger, journalEntryService: JournalEntryService) {
    super(logger, APIPath.JOURNAL);

    this.journalEntryService = journalEntryService;

    this.addRoute({
      path: JournalApiPath.ROOT,
      method: 'POST',
      validation: {
        body: createJournalEntryValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            body: JournalEntryCreateRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: JournalApiPath.ROOT,
      method: 'GET',
      validation: {
        query: entitiesFilteringQueryValidationSchema,
      },
      handler: (options) => {
        return this.getAll(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            query: EntitiesFilteringDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: JournalApiPath.$ID,
      method: 'PUT',
      validation: {
        body: createJournalEntryValidationSchema,
      },
      handler: (options) => {
        return this.update(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            params: { id: string };
            body: JournalEntryCreateRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: JournalApiPath.$ID,
      method: 'DELETE',
      handler: (options) => {
        return this.delete(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            params: { id: string };
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /journal:
   *    post:
   *      description: Creates a journal entry
   *      requestBody:
   *        description: Journal Entry data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                title:
   *                  type: string
   *                text:
   *                  type: string
   *                  example: "<p>Put your text here</p>"
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                  $ref: '#/components/schemas/Journal Entry'
   *        401:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "Incorrect credentials."
   *                errorType: "AUTHORIZATION"
   *        404:
   *          description: User was not found
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "User with these credentials was not found."
   *                errorType: "USERS"
   *        422:
   *          description: Validation failed
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Unprocessable Journal Entity'
   */

  private async create(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
      body: JournalEntryCreateRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const { id: userId } = options.user;
    const { body } = options;

    return {
      status: HTTPCode.CREATED,
      payload: await this.journalEntryService.create({
        userId,
        body,
      }),
    };
  }

  /**
   * @swagger
   * /journal:
   *    get:
   *      description: Get all journal entries
   *      security:
   *       - bearerAuth: []
   *      parameters:
   *        - name: query
   *          in: query
   *          description: A string to search journal entries
   *          required: false
   *          schema:
   *            type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/Journal Entry'
   *        401:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "Incorrect credentials."
   *                errorType: "AUTHORIZATION"
   *        400:
   *          description: Bad Request
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: integer
   *                    example: 400
   *                  message:
   *                    type: string
   *                    example: The data which was passed is incorrect.
   */

  private async getAll(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
      query: EntitiesFilteringDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const { id } = options.user;

    return {
      status: HTTPCode.OK,
      payload: await this.journalEntryService.findAllByUserId(
        id,
        options.query.query,
      ),
    };
  }

  /**
   * @swagger
   * /journal/{id}:
   *    put:
   *      description: Update a journal entry
   *      security:
   *       - bearerAuth: []
   *      parameters:
   *       -  in: path
   *          description: Journal id
   *          name: id
   *          required: true
   *          type: number
   *          minimum: 1
   *      requestBody:
   *        description: Journal Entry data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                title:
   *                  type: string
   *                text:
   *                  type: string
   *                  example: "<p>Put your text here</p>"
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                 $ref: '#/components/schemas/Journal Entry'
   *        401:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "Incorrect credentials."
   *                errorType: "AUTHORIZATION"
   *        404:
   *          description: User was not found
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "User with these credentials was not found."
   *                errorType: "USERS"
   *        422:
   *          description: Validation failed
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Unprocessable Journal Entity'
   */

  private async update(
    options: APIHandlerOptions<{
      params: { id: string };
      user: UserAuthResponseDto;
      body: JournalEntryCreateRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const { id } = options.params;
    const { id: userId } = options.user;
    const {
      body: { title, text },
    } = options;

    return {
      status: HTTPCode.OK,
      payload: await this.journalEntryService.update({
        id: Number(id),
        userId,
        text,
        title,
      }),
    };
  }

  /**
   * @swagger
   * /journal/{id}:
   *   delete:
   *     description: Delete a journal entry by ID
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the journal entry to delete
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted the journal entry
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   *       400:
   *         description: Incorrect user credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "Incorrect credentials."
   *               errorType: "COMMON"
   *       404:
   *         description: Incorrect journal credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "Journal with these credentials was not found."
   *               errorType: "COMMON"
   */

  private async delete(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
      params: { id: string };
    }>,
  ): Promise<APIHandlerResponse> {
    const { id } = options.params;

    const isDeleted = await this.journalEntryService.delete({
      id: Number(id),
      user: options.user,
    });

    if (!isDeleted) {
      throw new JournalError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.JOURNAL_NOT_FOUND,
      });
    }

    return {
      status: HTTPCode.OK,
      payload: isDeleted,
    };
  }
}

export { JournalEntryController };
