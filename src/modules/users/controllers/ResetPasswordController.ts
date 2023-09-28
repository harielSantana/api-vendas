import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
