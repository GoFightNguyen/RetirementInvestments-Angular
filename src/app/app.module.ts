import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { SummaryComponent } from './summary/summary.component';
import { InvestmentDisplayComponent } from './investment/investment-display.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentFormComponent,
    SummaryComponent,
    InvestmentDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
