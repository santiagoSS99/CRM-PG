import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { isUUID } from 'class-validator';
import handlebars from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';
import { Subject } from 'rxjs';
import ejs = require('ejs');
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
var jwt = require('../auth/helpers/jwt-client')
require("dotenv").config();



@Injectable()
export class CustomerService {

  private readonly logger = new Logger('CostumerService');

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwtService: JwtService

    // private readonly mailerService: MailerService
  ) { }
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { ...costumer } = createCustomerDto
      const client = this.customerRepo.create({
        ...costumer
      });
      await this.customerRepo.save(client)
      return { client, message: 'Customer has been registered' }
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async createFromAdmin(createCustomerDto: CreateCustomerDto) {
    try {
      const { ...costumer } = createCustomerDto
      const client = this.customerRepo.create({
        ...costumer
      });
      await this.customerRepo.save(client)
      this.sendMailVerification(client.email)
      return {
        client,
        // token: this.getJWTToken({ id: client.id }),
        message: 'Customer has been registered'
      }
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async sendMailVerification(email) {

    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
          throw err;
          callback(err);
        }
        else {
          callback(null, html);
        }
      });
    };

    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'santiagosanchezcorrea520@gmail.com',
        pass: 'pkmfgfvrdgvmkteh'
      }
    }));


    var customer = await this.customerRepo.findOneBy({ email: email })
    // console.log(customer)
    var token = jwt.createToken(customer)
    // console.log(token)


    readHTMLFile(process.cwd() + '/src/mails/account_verify.html', (err, html) => {

      let rest_html = ejs.render(html, { token: token })
      var template = handlebars.compile(rest_html)
      var htmlToSend = template({ op: true })

      var mailOptions = {
        from: 'santiagosanchezcorrea520@gmail.com',
        to: email,
        subject: 'Verification account',
        html: htmlToSend
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (!err) {
          console.log('email sent' + info.response)
        }
      })

    })
  }

  async findAll() {
    const customers = await this.customerRepo.find();
    return customers;
  }

  async findOne(id: number) {
    let customer: Customer;
    customer = await this.customerRepo.findOneBy({ id: String(id) });


    if (!customer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return customer
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let currentCustomer: Customer;
    currentCustomer = await this.customerRepo.findOneBy({ id: String(id) });

    if (!currentCustomer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    const {
      name = currentCustomer.name,
      surnames = currentCustomer.surnames,
      country = currentCustomer.country,
      email = currentCustomer.email,
      t_number = currentCustomer.t_number,
      gender = currentCustomer.gender,
      f_birthday = currentCustomer.f_birthday,
      notifications = currentCustomer.notifications
    } = updateCustomerDto;

    await this.customerRepo.createQueryBuilder()
      .update(Customer)
      .set({
        name,
        surnames,
        country,
        email,
        t_number,
        gender,
        f_birthday,
        notifications
      })
      .where("id = :id", { id })
      .execute();

    currentCustomer = await this.customerRepo.findOneBy({ id: String(id) });
    if (!currentCustomer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return { message: `User with id ${id} updated succesfully`, customer: currentCustomer }
  }

  async remove(id: number) {
    try {
      const customer = await this.customerRepo.findOneBy({ id: String(id) });
      await this.customerRepo.remove(customer);
      return `This action removed the customer with id #${id}`;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, please check the logs')
  }

  getJWTToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }
}


