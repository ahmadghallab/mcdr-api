import { Request } from 'express';

export class RequestContext {
  private static currentRequest: Request;

  static setCurrentRequest(request: Request) {
    this.currentRequest = request;
  }

  static getCurrentHost(): string {
    if (!this.currentRequest) {
      return 'http://localhost:3000'; // Default fallback
    }
    return `${this.currentRequest.protocol}://${this.currentRequest.get('host')}`;
  }
}
