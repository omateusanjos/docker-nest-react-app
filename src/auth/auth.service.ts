import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    validateApiKey(apiKey: string): boolean {
        const validApiKey = process.env.API_KEY;
        return apiKey === validApiKey;
    }
}
