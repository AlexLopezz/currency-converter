import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseCoinLayer, ResponseExchangeRate } from '../interfaces/response.interface';
import { Currency } from '../interfaces/currency.interface';
import { CurrencyFilterOption } from '../interfaces/currencyFilterOption.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _httpClient: HttpClient = inject( HttpClient );

  getOptionsFilter(): CurrencyFilterOption[] {
    return [
      { value: 'PHYSICAL', name: 'Monedas fisicas' },
      { value: 'CRYPTO', name: 'Criptomonedas' }
    ]
  }

  getAllPhysicalCurrencies(): Currency[]{
    return [
      {symbol: 'USD', label: 'Dolar'},
      {symbol: 'EUR', label: 'Euro'},
      {symbol: 'GBP', label: 'Libra Esterlina'},
      {symbol: 'JPY', label: 'Yen Japones'},
      {symbol: 'ARS', label: 'Pesos Argentinos'}
    ]
  }

  getAllCryptoCurrencies(): Currency[] {
    return [
      {symbol: 'BTC', label: 'Bitcoin'},
      {symbol: 'ETH', label: 'Ethereum'},
      {symbol: 'USDT', label: 'Dolar Cripto'},
      {symbol: 'ADA', label: 'Cardano'},
      {symbol: 'SOL', label: 'Solana'}
    ]
  }

  getExchangreRateConversion( source: string ): Observable<ResponseExchangeRate> {
    return this._httpClient
      .get<ResponseExchangeRate>( `https://v6.exchangerate-api.com/v6/1aec0c6665483d49f64f8264/latest/${ source }` );
  }

  getCoinLayerConversion(): Observable<ResponseCoinLayer> {
    return this._httpClient.get<ResponseCoinLayer>( 'https://api.coinlayer.com/live?access_key=8d38017969ff1aea383504bcdbebc12d' );
  }
}
