import { Controller, Get, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, ParseIntPipe, Param, UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ZodValidationPipe, createCatSchema } from 'src/common/pipes/zoid-validation.pipe';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { User } from 'src/common/decorators/user.decorator';


@Controller('cats')
// @UseGuards(new RolesGuard())
@UseInterceptors(new TransformInterceptor())
@UseInterceptors(new LoggingInterceptor())
export class CatsController {
    constructor(private catsService: CatsService) { }

    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    // @Post()
    // @UseFilters(new HttpExceptionFilter())
    // async create(@Body() createCatDto: CreateCatDto) {
    //     throw new ForbiddenException();
    // }
    // @Post()
    // @UsePipes(new ZodValidationPipe(createCatSchema))
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    // }

    // @Post()
    // async create(
    //     @Body(new ValidationPipe()) createCatDto: CreateCatDto,
    // ) {
    //     this.catsService.create(createCatDto);
    // }
    @Post()
    @Roles(['admin'])
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }
    @Get()
    async findAll() {
        try {
            await this.catsService.findAll()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // @Get()
    // async findAll() {
    //     throw new ForbiddenException();
    // }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.findOne(id);
    }
    //     @Get()
    // async findOne(@User() user: UserEntity) {
    //   console.log(user);
    // }




}