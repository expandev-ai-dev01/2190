/**
 * @summary
 * API controller for User registration.
 * Handles external public endpoints for user creation.
 *
 * @module api/external/user/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { userRegister } from '@/services/user';

/**
 * @api {post} /api/external/user/register Register New User
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiBody {String} tipoUsuario User type (usuario_final | profissional_saude)
 * @apiBody {String} metodoCadastro Registration method (email | google | facebook)
 * @apiBody {String} nomeCompleto Full name
 * @apiBody {String} email Email address
 * @apiBody {String} [senha] Password (required for email method)
 * @apiBody {String} dataNascimento Birth date (ISO date string)
 * @apiBody {String} genero Gender
 * @apiBody {Object} dadosAntropometricos Anthropometric data
 * @apiBody {Number} dadosAntropometricos.pesoAtual Current weight
 * @apiBody {Number} dadosAntropometricos.altura Height
 * @apiBody {Object} estiloVida Lifestyle data
 * @apiBody {String} estiloVida.nivelAtividadeFisica Activity level
 * @apiBody {Boolean} aceiteTermos Terms acceptance
 * @apiBody {Boolean} aceitePrivacidade Privacy acceptance
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Number} data.id User ID
 * @apiSuccess {String} data.email User email
 * @apiSuccess {String} data.mensagem Success message
 *
 * @apiError {Boolean} success Success flag (false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await userRegister(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
