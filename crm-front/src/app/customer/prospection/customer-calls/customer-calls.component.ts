import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
declare var $: any


@Component({
  selector: 'app-customer-calls',
  templateUrl: './customer-calls.component.html',
  styleUrls: ['./customer-calls.component.scss']
})
export class CustomerCallsComponent implements OnInit {

  id: any
  call: any = {
    result: '',
    date: new Date().toISOString().substring(0, 10),
    hour: '',
    assesor: localStorage.getItem('id'),
    customer: '',
    note: ''
  };
  time = { hour: new Date().getHours(), minutes: new Date().getMinutes() }
  public token = localStorage.getItem('token');
  btn_load = false

  calls: any = []



  constructor(
    private _route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCalls();
    this._route.params.subscribe(
      params => {
        this.id = parseInt(params['id'], 10)
        this.getCallsByCustomer(this.id)
      }
    )
  }

  registerCall() {

    if (this.time || this.time != undefined || this.time != null) {
      this.call.hour = this.time.hour + ':' + this.time.minutes
    }

    if (!this.call.result) {
      $.notify('Please fill result field', {
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
      this.btn_load = true
      this.call.customer = this.id.toString()
      this.customerService.createCustomerCall(this.call, this.token).subscribe(
        res => {
          this.btn_load = false
          this.closeModal()
          $.notify(res, {
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

  getCalls() {
    this.customerService.getCalls(this.token).subscribe(
      res => {
        console.log(res)
      })
  }

  getCallsByCustomer(id: any) {
    id = this.id
    console.log(id)
    this.customerService.getCallsByCustomer(id, this.token).subscribe(
      (res: any[]) => {
        this.calls = res
        console.log(res)
      })
  }

  closeModal() {
    $(`#modalLlamada`).modal('hide');
  }
}

