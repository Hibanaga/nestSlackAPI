import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { CurrencyModule } from './modules/currency/currency.module';

@Module({
  imports: [CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
