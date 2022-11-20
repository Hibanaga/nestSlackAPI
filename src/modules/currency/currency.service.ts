import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly http: HttpService) {}

  async all() {
    try {
      return await this.http
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        .pipe(map((resp) => resp.data))
        .toPromise();
    } catch (error) {
      throw new HttpException('Forbitten', HttpStatus.FORBIDDEN);
    }
  }

  async currency(currencyName: string, amount: number) {
    try {
      const currencies = await this.all();

      return CurrencyService.calculate({
        amount: amount,
        sourceCurrency: currencyName,
        objWallet: currencies,
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  private static calculate({
    amount,
    sourceCurrency,
    targetCurrency = 'RUB',
    objWallet,
  }: {
    amount: number;
    sourceCurrency: string;
    targetCurrency?: string;
    objWallet: { Valute: any };
  }) {
    if (targetCurrency === 'RUB') {
      return (
        (amount * objWallet.Valute[sourceCurrency].Value) /
        objWallet.Valute[sourceCurrency].Nominal
      ).toFixed(2);
    }

    const inRub =
      (amount * objWallet.Valute[sourceCurrency].Value) /
      objWallet[sourceCurrency].Nominal;

    return (
      (inRub / objWallet[targetCurrency].Value) *
      objWallet.Valute[targetCurrency].Nominal
    ).toFixed(2);
  }
}
