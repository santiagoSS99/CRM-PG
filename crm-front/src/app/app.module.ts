import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProductComponent } from './pages/products/form-product/form-product.component';
import { LiveReloadProductsComponent } from './pages/products/live-reload-products/live-reload-products.component';
import { InventoryComponent } from './pages/products/inventory/inventory.component';
import { SalesComponent } from './pages/sales/sales.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { CrmButtonComponent } from './custom-fields/crm-button/crm-button.component';
import { CreateTableComponent } from './pages/tables/create-table/create-table.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductSelectionComponent } from './pages/product-selection/product-selection.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './customer/customers/customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { VerificationComponent } from './customer/verification/verification.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerProspectionComponent } from './customer/prospection/customer-prospection/customer-prospection.component';
import { CustomerAsideComponent } from './customer/customer-aside/customer-aside.component';
import { CustomerCallsComponent } from './customer/prospection/customer-calls/customer-calls.component';
import { CustomerMailsComponent } from './customer/prospection/customer-mails/customer-mails.component';
import { CustomerInterestsComponent } from './customer/prospection/customer-interests/customer-interests.component';
import { TimepickerComponent } from './custom-fields/timepicker/timepicker.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceComponent } from './pages/performance/performance.component';
import { ProfitSortPipe } from './pipes/profit-sort.pipe';
import { PaymentProcessComponent } from './pages/payment-process/payment-process.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { HomeHeaderComponent } from './pages/home-header/home-header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    InventoryComponent,
    FormProductComponent,
    LiveReloadProductsComponent,
    SalesComponent,
    EditProductComponent,
    CrmButtonComponent,
    CreateTableComponent,
    OrderDetailComponent,
    ProductSelectionComponent,
    CalendarComponent,
    HomeComponent,
    CampaignComponent,
    UserManagementComponent,
    CustomersComponent,
    CreateCustomerComponent,
    VerificationComponent,
    CustomerTableComponent,
    EditCustomerComponent,
    CustomerDashboardComponent,
    CustomerProspectionComponent,
    CustomerAsideComponent,
    CustomerCallsComponent,
    CustomerMailsComponent,
    CustomerInterestsComponent,
    TimepickerComponent,
    PerformanceComponent,
    ProfitSortPipe,
    PaymentProcessComponent,
    ECommerceComponent,
    HomeHeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    EditorModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
