import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  getCountries() {
    return [
      { name: 'Germany' },
      { name: 'France' },
      { name: 'Italy' }
      // Fügen Sie hier weitere Länder hinzu
    ];
  }
}
