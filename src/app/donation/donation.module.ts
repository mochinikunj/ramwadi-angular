import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DonationComponent],
  imports: [CommonModule, DonationRoutingModule, TranslateModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class DonationModule {}
