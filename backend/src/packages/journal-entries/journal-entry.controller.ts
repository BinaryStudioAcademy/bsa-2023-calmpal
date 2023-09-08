import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { type JournalEntryService } from './journal-entry.service.js';
import { JournalApiPath } from './libs/enums/enums.js';
import { type JournalEntryCreateRequestDto } from './libs/types/types.js';

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
  }

  /**
   * @swagger
   * /journal-entries:
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
   * /journal-entries:
   *    get:
   *      description: Get all a journal entries
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
}

export { JournalEntryController };
