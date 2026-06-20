// User model

const { UserRole, UserStatus } = require('../types/userTypes');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.address = data.address;
    this.role = data.role || UserRole.CUSTOMER;
    this.status = data.status || UserStatus.ACTIVE;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  isChef() {
    return this.role === UserRole.CHEF;
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  isActive() {
    return this.status === UserStatus.ACTIVE;
  }

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }
}

module.exports = User;
