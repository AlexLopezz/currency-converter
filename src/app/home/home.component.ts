import { Component, inject } from '@angular/core';
import { CurrencyService } from './service/currency.service';

import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { SelectOptionsComponent } from "./components/select-options/select-options.component";
import { Currency } from './interfaces/currency.interface';
import { CurrencyFilterOption } from './interfaces/currencyFilterOption.interface';
import { DecimalPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [MatIconModule, MatRadioModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, SelectOptionsComponent, SelectOptionsComponent, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  optionsFilter: CurrencyFilterOption[] = [];
  currencies: Currency[] = [];
  
  conversionResult?: number;
  sourceOptionValue?: Currency;
  outputOptionValue?: Currency;
  
  private _currentOptionFilter: string = 'none';
  private _currencyService = inject( CurrencyService );

  constructor(){
    this.currencies =this._currencyService.getAllPhysicalCurrencies();
    this.optionsFilter =this._currencyService.getOptionsFilter();
  }


  loadCurrencies( option: string ){
    this._currentOptionFilter = option;

    switch( option ){
      case 'PHYSICAL': {
        this.currencies = this._currencyService.getAllPhysicalCurrencies();
        break;
      }
      case 'CRYPTO': {
        this.currencies = this._currencyService.getAllCryptoCurrencies();
        break;
      }
    }
  }

  onConvertButton( value: string ){
    console.log( 'source: ', this.sourceOptionValue );
    console.log( 'output: ', this.outputOptionValue );

    switch( this._currentOptionFilter ){
      case 'PHYSICAL':
        this._currencyService.getExchangreRateConversion( this.sourceOptionValue!.symbol )
        .subscribe( data => {
          const { conversion_rates } = data;
  
          let valueToConvert: number = parseFloat( value );
          this.conversionResult = valueToConvert * conversion_rates[this.outputOptionValue!.symbol] / conversion_rates[ this.sourceOptionValue!.symbol ];
        });
      break;

      case 'CRYPTO':
        this._currencyService.getCoinLayerConversion()
          .subscribe( ( response ) => { 
            console.log( response );

            const valueToConvert: number = parseFloat( value );
            const unitPrice =response.rates[ this.sourceOptionValue!.symbol ] / response.rates[this.outputOptionValue!.symbol];

            this.conversionResult = valueToConvert * unitPrice;
          });
      break;
     }
   
  }

}
