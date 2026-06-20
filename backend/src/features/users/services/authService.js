const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const User = require('../models/User');
const config = require('../../../shared/config/environment');

class AuthService {
  async register(data) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      const err = new Error('Email já está registrado');
      err.status = 409;
      throw err;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = new User({
      ...data,
      password: hashedPassword
    });

    const createdUser = await userRepository.create(user);
    
    // Generate tokens
    const tokens = this.generateTokens(createdUser);
    
    return {
      user: createdUser.toJSON(),
      ...tokens
    };
  }

  async login(email, password) {
    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Email ou senha inválidos');
      err.status = 401;
      throw err;
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const err = new Error('Email ou senha inválidos');
      err.status = 401;
      throw err;
    }

    // Check if user is active
    if (!user.isActive()) {
      const err = new Error('Usuário inativo');
      err.status = 403;
      throw err;
    }

    // Generate tokens
    const tokens = this.generateTokens(user);

    return {
      user: user.toJSON(),
      ...tokens
    };
  }

  generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '15m'
    });

    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '7d'
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900 // 15 minutes in seconds
    };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
      
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        const err = new Error('Usuário não encontrado');
        err.status = 404;
        throw err;
      }

      if (!user.isActive()) {
        const err = new Error('Usuário inativo');
        err.status = 403;
        throw err;
      }

      return this.generateTokens(user);
    } catch (error) {
      const err = new Error('Token de atualização inválido ou expirado');
      err.status = 401;
      throw err;
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      const err = new Error('Token inválido ou expirado');
      err.status = 401;
      throw err;
    }
  }
}

module.exports = new AuthService();
