import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
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
    CampaignComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
