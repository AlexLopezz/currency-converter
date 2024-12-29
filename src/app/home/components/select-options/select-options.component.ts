import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Currency } from '../../interfaces/currency.interface';

@Component({
  selector: 'home-select-options',
  standalone: true,
  imports: [MatRadioModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './select-options.component.html',
  styleUrl: './select-options.component.css'
})
export class SelectOptionsComponent {
  @Input({ required: true }) currencyOptions: Currency[] = [];
  @Input() currencyOptionSelected: string= 'none';

  @Output() selectOption = new EventEmitter< Currency >();

  onSelectOption( $event: MatSelectChange){
    console.log( $event );

    this.selectOption.emit( $event.value );
  }
}
