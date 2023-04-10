import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/customer';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loading: boolean;
    error: boolean;
    success: boolean;
    errorMessage: string;

    /**
     * Custom Regex
     */
    emailRegex = /^(.+)@(.+).(.+)$/;
    numberRegex = /^3[0-9]{9}$/;

    customers: any;
    customer: Customer = {
      name: '',
      surnames: '',
      country: 'CO',
      email: '',
      t_number: '',
      gender: '3',
      f_birthday: '',
      notifications: false,
    }
    constructor(private customerService: CustomerService) {
      this.loading = false;
      this.error = false;
      this.success = false;
      this.errorMessage = "";
    }

    ngOnInit(): void {
        this.loadCustomers();
    }

    loadCustomers() {
        this.customerService.getCustomers().subscribe((res) => {
          this.customers = res
        })
      }

    submitForm(){
      this.loading = true;
      this.error = false;
      this.success = false;

      if(!this.customer.name){
        this.setError("No has digitado tu nombre");
        return;
      }

      if(!this.customer.surnames){
        this.setError("No has digitado tus apellidos");
        return;
      }

      if(!this.customer.email){
        this.setError("Debes ingresar tu e-mail");
        return;
      }

      if(!this.emailRegex.test(this.customer.email)){
        this.setError("Debes ingresar un e-mail válido");
        return;
      }

      if(!this.customer.t_number){
        this.setError("Debes ingresar tu número de teléfono");
        return;
      }

      if(!this.numberRegex.test(this.customer.t_number)){
        this.setError("Debes ingresar un teléfono válido");
        return;
      }

      if(!this.customer.f_birthday){
        this.setError("Debes ingresar tu fecha de nacimiento");
        return;
      }
      this.customer.f_birthday = new Date(this.customer.f_birthday).toISOString();

      try{
        this.customerService.createCustomer(this.customer).subscribe((response) => {
          this.setSuccess();
        })
      }catch(error){
        this.setError("¡Hubo un error realizando este registro, intentelo de nuevo más tarde!")
      }
    }

    setSuccess(){
      this.loading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      },2000);
    }

    setError(message: string){
      this.error = true;
      this.errorMessage = message;
      this.loading = false;
    }
}
