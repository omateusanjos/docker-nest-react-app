import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    validateApiKey(apiKey: string): boolean {
        const validApiKey = process.env.API_KEY;
        console.log('validApiKey: ' + validApiKey);
        return apiKey === validApiKey;
    }
}
