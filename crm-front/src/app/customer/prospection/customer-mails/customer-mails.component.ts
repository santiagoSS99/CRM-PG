import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

declare var $: any


@Component({
  selector: 'app-customer-mails',
  templateUrl: './customer-mails.component.html',
  styleUrls: ['./customer-mails.component.scss']
})
export class CustomerMailsComponent implements OnInit {

  id: any
  token = localStorage.getItem('token');
  data = false
  load_data = true

  sendBtn = false
  email: any = {
    assesor: localStorage.getItem('id'),
    customer: '',
  }

  mails: any = []


  constructor(
    private _route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = parseInt(params['id'], 10)
        this.customerService.getCustomerById(this.id, this.token).subscribe(
          response => {
            console.warn('Mails Section')
            console.log(response)
            if (response != undefined) {
              this.data = true;
              this.load_data = false;
              this.getMailsByCustomer(this.id)
            }
          }
        )
      }
    )

    // this.tinymce.init({
    //   selector: 'textarea#default'
    // });
  }

  sendEmail() {
    console.log(this.email)
    if (!this.email.content) {
      $.notify('Ingrese el contenido del correo', {
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
    } else if (!this.email.subject) {
      $.notify('Ingrese el asunto del correo', {
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
    } else {
      this.sendBtn = true
      this.email.customer = this.id.toString()
      this.customerService.createCustomerMail(this.email, this.token).subscribe(
        response => {
          this.closeModal()
          console.log(response);
          this.sendBtn = false
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
        }
      )
    }
  }

  getMails() {
    this.customerService.getCalls(this.token).subscribe(
      res => {
        console.log(res)
      })
  }

  getMailsByCustomer(id: any) {
    id = this.id
    console.log(id)
    this.customerService.getMailsByCustomer(id, this.token).subscribe(
      res => {
        this.mails = res
        console.log(res)
      })
  }


  closeModal() {
    $(`#modalMail`).modal('hide');
  }

  toggleEmail(id: any) {
    var clase = $('#card_' + id).attr('class');

    if (clase == 'card-spacer-x pt-2 pb-5 toggle-off-item') {
      $('#card_' + id).removeClass('toggle-off-item');
      $('#card_' + id).addClass('toggle-on-item');
    } else if (clase == 'card-spacer-x pt-2 pb-5 toggle-on-item') {
      $('#card_' + id).removeClass('toggle-on-item');
      $('#card_' + id).addClass('toggle-off-item');
    }
  }
}
