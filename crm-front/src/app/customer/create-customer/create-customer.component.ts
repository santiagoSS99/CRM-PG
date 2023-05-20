import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

declare var $: any

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer = {
    name: '',
    surnames: '',
    country: '',
    email: '',
    gender: '',
    f_birthday: '',
    notifications: false,
    t_number: ''
  }

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  registerCustomer(registerForm: any) {
    console.log(registerForm)

    if (!registerForm.value.name) {
      $.notify('Make sure to fill in the name field', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else if (!registerForm.value.surnames) {
      $.notify('Make sure to fill in the surnames field', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else if (!registerForm.value.email) {
      $.notify('Make sure to fill in the email field', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } if (!registerForm.value.t_number) {
      $.notify('Make sure to fill in the number field', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    }
    else {
      let customer: Customer = {
        name: this.customer.name,
        surnames: this.customer.surnames,
        country: this.customer.country,
        email: this.customer.email,
        gender: this.customer.gender,
        f_birthday: new Date(this.customer.f_birthday).toISOString(),
        notifications: false,
        t_number: this.customer.t_number
      }
      this.customerService.createCustomerFromAdmin(customer).subscribe(response => {
        $.notify(response, {
          type: 'success',
          spacing: 10,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'right'
          },
          delay: 1000,
          animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
          }
        });
      })
    }
  }
}
