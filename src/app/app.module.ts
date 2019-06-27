import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { SummaryComponent } from './summary/summary.component';
import { InvestmentDisplayComponent } from './investment/investment-display.component';
import { InvestmentEditComponent } from './investment/investment-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentFormComponent,
    SummaryComponent,
    InvestmentDisplayComponent,
    InvestmentEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
