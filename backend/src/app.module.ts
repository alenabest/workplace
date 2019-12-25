import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UserModule,
    AuthModule,

    TypeOrmModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
