import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import { type UserAuthResponseDto } from '#packages/users/libs/types/types.js';

import { UsersApiPath } from './libs/enums/enums.js';
import { type UserService } from './user.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDeleteResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           nullable: true
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         errorType:
 *           type: string
 */

class UserController extends BaseController {
  private userService: UserService;

  public constructor(logger: Logger, userService: UserService) {
    super(logger, APIPath.USERS);

    this.userService = userService;

    this.addRoute({
      path: UsersApiPath.$ID,
      method: 'DELETE',
      handler: (options) => {
        return this.deleteAuthenticatedUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /{id}:
   *   delete:
   *     description: Delete an authenticated user by their ID
   *     parameters:
   *       - name: id
   *         in: path
   *         description: User ID to delete
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *     responses:
   *       200:
   *         description: "Successful deletion. Returns 'true' if the user was deleted successfully."
   *         content:
   *           application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserDeleteResponseDto'
   *       404:
   *          description: "User not found. Returns 'false' if the user could not be found."
   *         content:
   *           application/json:
   *           schema:
   *             $ref: '#/components/schemas/Error'
   *           example:
   *            message: "User with these credentials was not found."
   *            errorType: "USERS"
   */
  private async deleteAuthenticatedUser(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.userService.delete(options.user.id),
    };
  }
}

export { UserController };
