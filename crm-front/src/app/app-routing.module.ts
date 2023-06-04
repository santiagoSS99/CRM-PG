import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormProductComponent } from './pages/products/form-product/form-product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CustomersComponent } from './customer/customers/customer.component';
import { VerificationComponent } from './customer/verification/verification.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerProspectionComponent } from './customer/prospection/customer-prospection/customer-prospection.component';
import { CustomerInterestsComponent } from './customer/prospection/customer-interests/customer-interests.component';
import { CustomerCallsComponent } from './customer/prospection/customer-calls/customer-calls.component';
import { CustomerMailsComponent } from './customer/prospection/customer-mails/customer-mails.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'products', component: FormProductComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'user/management', component: UserManagementComponent },

  { path: 'verification/:token', component: VerificationComponent },

  { path: 'customers', component: CustomersComponent },
  { path: 'customer/:id/dashboard', component: CustomerDashboardComponent },
  { path: 'customer/:id/prospection', component: CustomerProspectionComponent },
  { path: 'customer/:id/prospection/interests', component: CustomerInterestsComponent },
  { path: 'customer/:id/prospection/calls', component: CustomerCallsComponent },
  { path: 'customer/:id/prospection/mails', component: CustomerMailsComponent },
  { path: 'performance', component: PerformanceComponent },

  { path: 'e-commerce', component: ECommerceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
