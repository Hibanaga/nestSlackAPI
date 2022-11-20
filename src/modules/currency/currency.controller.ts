import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/')
  async currencies() {
    return await this.currencyService.all();
  }

  @Get('/:currencyName')
  async currency(@Param('currencyName') currencyName, @Query('amount') amount) {
    return this.currencyService.currency(currencyName, amount);
  }
}
