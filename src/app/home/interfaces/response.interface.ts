export interface ResponseExchangeRate {
    base_code:             string;
    conversion_rates:      { [key: string]: number };
}

export interface ResponseCoinLayer {
    success:   boolean;
    target:    string;
    rates:     { [key: string]: number };
}



