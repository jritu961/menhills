export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthenticatedError';
      this.statusCode = 401;
    }
  }
  
  export class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ForbiddenError';
      this.statusCode = 403;
    }
  }
  