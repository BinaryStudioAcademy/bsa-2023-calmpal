import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  userSignInValidationSchema,
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '#packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 *          fullName:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          isSurveyCompleted:
 *            type: boolean
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          errorType:
 *            type: string
 */
class AuthController extends BaseController {
  private authService: AuthService;

  public constructor(logger: Logger, authService: AuthService) {
    super(logger, APIPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) => {
        return this.signUp(
          options as APIHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) => {
        return this.signIn(
          options as APIHandlerOptions<{
            body: UserSignInRequestDto;
          }>,
        );
      },
    });
    this.addRoute({
      path: AuthApiPath.AUTHENTICATED_USER,
      method: 'GET',
      handler: (options) => {
        return this.getAuthenticatedUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                fullName:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   *                  token:
   *                    type: string
   *        400:
   *          description: Bad request. User already exists
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   *              example:
   *                message: "User already exists."
   *                errorType: "AUTHORIZATION"
   */
  private async signUp(
    options: APIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  /**
   * @swagger
   * /auth/sign-in:
   *    post:
   *      description: Sign in user with credentials
   *      requestBody:
   *        description: User login credentials
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   *                  token:
   *                    type: string
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
   */
  private async signIn(
    options: APIHandlerOptions<{
      body: UserSignInRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const user = await this.authService.verifyLoginCredentials(options.body);

    return {
      status: HTTPCode.OK,
      payload: await this.authService.signIn(user),
    };
  }

  /**
   * @swagger
   * /auth/authenticated-user:
   *    get:
   *      description: Returns an authenticated user
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  private async getAuthenticatedUser(
    options: APIHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.authService.getAuthenticatedUser(options.user.id),
    };
  }
}

export { AuthController };
