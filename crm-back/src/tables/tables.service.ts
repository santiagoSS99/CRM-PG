import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Tables } from './entities/table.entity';

@Injectable()
export class TablesService {

    private readonly logger = new Logger('ProductsService');

    constructor(
        @InjectRepository(Tables)
        private readonly tableRepo: Repository<Tables>
    ) { }

    async create(createTableDto: CreateTableDto) {
        try {
            const { ...tableDetails } = createTableDto
            const table = this.tableRepo.create({
                ...tableDetails
            });
            await this.tableRepo.save(table)
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async findAll() {
        const tables = await this.tableRepo.find()
        return tables
    }

    async findOne(id: string) {
        let table: Tables
        if (id) {
            table = await this.tableRepo.findOneBy({ id: id })
        } else {
            const queryBuilder = this.tableRepo.createQueryBuilder('table')
            table = await queryBuilder.where(`id = :id`).getOne()
        }
        if (!table) throw new NotFoundException(`table with id ${id} not found`)
        return table
    }

    async updateStatus(id: string, updateTableDto: UpdateTableDto) {
        const { status } = updateTableDto;

        try {
            const table = await this.tableRepo.findOneBy({ id });

            if (!table) {
                throw new NotFoundException(`Table with id ${id} not found`);
            }

            table.table_status = status; // Asigna el valor del estado a la propiedad correspondiente

            const updatedTable = await this.tableRepo.save(table);

            return updatedTable;
        } catch (error) {
            // Manejo de excepciones
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }


    remove(id: number) {
        return `This action removes a #${id} table`;
    }

    private handleDBExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error)
        throw new InternalServerErrorException('unexpected error, please check the logs')
    }
}