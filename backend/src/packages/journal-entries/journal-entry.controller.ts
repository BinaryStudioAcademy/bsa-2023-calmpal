import { ExceptionMessage, JournalError } from 'shared/build/index.js';

import { APIPath } from '#libs/enums/enums.js';
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
  type JournalDeleteParameter,
  type JournalEntryCreateRequestDto,
} from './libs/types/types.js';

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
 *          title:
 *            type: string
 *          text:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */

class JournalEntryController extends BaseController {
  private journalEntryService: JournalEntryService;

  public constructor(logger: Logger, journalEntryService: JournalEntryService) {
    super(logger, APIPath.JOURNAL);

    this.journalEntryService = journalEntryService;

    this.addRoute({
      path: JournalApiPath.ROOT,
      method: 'POST',
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: JournalEntryCreateRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: JournalApiPath.ROOT,
      method: 'GET',
      handler: () => {
        return this.getAll();
      },
    });

    this.addRoute({
      path: JournalApiPath.$ID,
      method: 'DELETE',
      handler: (options) => {
        return this.delete(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            params: JournalDeleteParameter;
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
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  journalEntry:
   *                    $ref: '#/components/schemas/Journal Entry'
   */

  private async create(
    options: APIHandlerOptions<{
      body: JournalEntryCreateRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.journalEntryService.create(options.body),
    };
  }

  /**
   * @swagger
   * /journal:
   *    get:
   *      description: Get all a journal entries
   *      security:
   *       - bearerAuth: []
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
   */

  private async getAll(): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.journalEntryService.findAll(),
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
   *               type: object
   *               properties:
   *                 isDeleted:
   *                   type: boolean
   *                   description: Is successfully deleted
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
      params: JournalDeleteParameter;
    }>,
  ): Promise<APIHandlerResponse> {
    const result = await this.journalEntryService.delete(
      options.params.id,
      options.user,
    );
    if (!result) {
      throw new JournalError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.JOURNAL_NOT_FOUND,
      });
    }

    return {
      status: HTTPCode.OK,
      payload: result,
    };
  }
}

export { JournalEntryController };
