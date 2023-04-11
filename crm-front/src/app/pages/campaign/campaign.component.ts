import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/customer';
import { Email } from 'src/app/interfaces/email';
import { EMAIL_JS } from 'src/app/constants';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null;
  email: Email;

  constructor(private customerService: CustomerService) {
    this.selectedCustomer = null;
    this.email = {
      from_name: "",
      message: "",
      to_email: "",
      message_title: "",
      title: "",
    };
  }
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((response: Customer[]) => {
      this.customers = response;
    });
  }

<<<<<<< HEAD
  getDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  selectCustomer(customer: Customer) {
    if (this.isCurrentCustomer(customer)) {
=======
  getDate(date: string){
    return new Date(date).toLocaleDateString();
  }

  selectCustomer(customer: Customer){
    if(this.isCurrentCustomer(customer)){
>>>>>>> dev
      this.selectedCustomer = null;
      return;
    }
    this.selectedCustomer = customer;
  }

  isCurrentCustomer(customer: Customer) {
    return this.selectedCustomer?.id === customer.id
  }

  showSelectedCustomer() {
    return JSON.stringify(this.selectedCustomer);
  }

  async sendEmail() {
    if (!this.selectedCustomer) {
      return;
    }
    try {
      await emailjs.send(EMAIL_JS.SERVICE_ID, EMAIL_JS.TEMPLATE_ID, {
        ...this.email,
        to_email: this.selectedCustomer.email,
      }, EMAIL_JS.PUBLIC_KEY);
      Swal.fire(
        '¡El mensaje se ha enviado exitosamente!',
        this.email.message,
        'success'
      )
    } catch (error) {
      Swal.fire(
        'Hubo un Error',
        'Al enviar el mensaje hubo un error',
        'error'
      )
    }
  }

  async sendCampaign() {

    this.customers.forEach(async (customer) => {
      try {
        await emailjs.send(EMAIL_JS.SERVICE_ID, EMAIL_JS.TEMPLATE_ID, {
          ...this.email,
          to_email: customer.email,
        }, EMAIL_JS.PUBLIC_KEY);
      } catch (error) {
        console.log("Hubo un error con el cliente" + JSON.stringify(customer));
      }
    });
    Swal.fire(
      '¡El mensaje se ha enviado masivamente exitosamente!',
      this.email.message,
      'success'
    )
  }
}
