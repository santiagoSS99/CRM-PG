import { Injectable } from '@nestjs/common';
import { CreateCustomerMailDto } from './dto/create-customer-mail.dto';
import { UpdateCustomerMailDto } from './dto/update-customer-mail.dto';

import { Customer } from '../customer/entities/customer.entity';

import { createToken } from 'src/auth/helpers/jwt-client';


import ejs = require('ejs');
import handlebars from 'handlebars';
import { CustomerMail } from './entities/customer-mail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
var jwt = require('../auth/helpers/jwt-client')
const _jwt = require('jsonwebtoken');
require("dotenv").config();

@Injectable()
export class CustomerMailService {

  constructor(
    @InjectRepository(CustomerMail)
    private readonly customerMailRepo: Repository<CustomerMail>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>

  ) { }

  async create(createCustomerMailDto: CreateCustomerMailDto) {
    try {
      const { ...customerMail } = createCustomerMailDto
      const mail = this.customerMailRepo.create({
        ...customerMail
      })
      // let _customer = await this.customerMailRepo.findBy({id: String(mail.customer)})
      let customer = await this.customerRepo.findOneBy({ id: String(mail.customer) })
      console.log(customer)
      await this.customerMailRepo.save(mail)
      this.sendProspectionEmail(customer.name, mail.subject, customer.email, mail.content)
      return { mail, message: 'Email stored succesfully' }

    } catch (err) {

    }
    // return 'This action adds a new customerMail';customer.email
  }



  async sendProspectionEmail(customer, subject, email, content) {

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
      service: process.env.mailservice,
      host: process.env.mailhost,
      auth: {
        user: process.env.mailuser,
        pass: process.env.mailpass
      }
    }));



    readHTMLFile(process.cwd() + '/src/mails/mail_message.html', (err, html) => {

      let rest_html = ejs.render(html, {
        customer: customer,
        subject: subject,
        email: email,
        content: content
      })

      var template = handlebars.compile(rest_html)
      var htmlToSend = template({ op: true })

      var mailOptions = {
        from: process.env.mailuser,
        to: email,
        subject: subject,
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
    const mails = await this.customerMailRepo.find()
    return mails
  }

  async findOne(id: number) {
    const customerMail = await this.customerMailRepo
      .createQueryBuilder('customerMail')
      .leftJoinAndSelect('customerMail.customer', 'customer')
      .leftJoinAndSelect('customerMail.assesor', 'assesor')
      .orderBy('customerMail.created_date', 'DESC')
      .where('customer.id = :customerId', { customerId: id })
      .getMany()

    return customerMail
  }

  update(id: number, updateCustomerMailDto: UpdateCustomerMailDto) {
    return `This action updates a #${id} customerMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerMail`;
  }
}
