import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/apikey.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'api-key' });


@Module({
    imports: [passportModule],
    providers: [AuthService, ApiKeyStrategy],
    exports: [AuthService, passportModule],
})

export class AuthModule { }
