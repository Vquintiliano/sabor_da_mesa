const authService = require('../services/authService');
const userValidator = require('../validators/userValidator');

class AuthController {
  async register(req, res, next) {
    try {
      const { error, value } = userValidator.validateRegister(req.body);
      if (error) {
        const err = new Error(error.details[0].message);
        err.status = 400;
        throw err;
      }

      const result = await authService.register(value);
      
      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { error, value } = userValidator.validateLogin(req.body);
      if (error) {
        const err = new Error(error.details[0].message);
        err.status = 400;
        throw err;
      }

      const result = await authService.login(value.email, value.password);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: result.user,
          accessToken: result.accessToken,
          expiresIn: result.expiresIn
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        const err = new Error('Token de atualização não fornecido');
        err.status = 400;
        throw err;
      }

      const tokens = await authService.refreshToken(refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        data: {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: req.user
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
