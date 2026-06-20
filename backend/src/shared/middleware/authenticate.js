const authService = require('../../features/users/services/authService');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new Error('Token não fornecido');
      err.status = 401;
      throw err;
    }

    const token = authHeader.substring(7);
    const decoded = authService.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    const err = new Error(error.message || 'Não autorizado');
    err.status = 401;
    next(err);
  }
};

module.exports = authenticate;
