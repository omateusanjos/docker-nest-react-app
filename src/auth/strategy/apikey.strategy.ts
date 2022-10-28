import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
    HeaderAPIKeyStrategy,
    'api-key',
) {
    constructor(private authService: AuthService) {
        super(
            {
                header: 'api-key',
                prefix: '',
            },
            true,
            async (apiKey: string, done: any) => {
                if (this.authService.validateApiKey(apiKey)) {
                    done(null, true);
                }
                console.log('API key not validated');
                done(new UnauthorizedException(), null);
            },
        );
    }
}
