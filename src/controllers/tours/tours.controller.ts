import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ToursService} from "../../service/tours/tours.service";
import {JwtAuthGuardService} from "../../service/Authentication/jwt-auth.guard/jwt-auth.guard.service";
import {User} from "../../shemas/user";
import {ITour} from "../../interfaces/tour";
import {Tour} from "../../shemas/tour";

@Controller('tours')
export class ToursController {
  constructor( private  toursService: ToursService) {
  }


  @Get(":id")
  getToursById(@Param('id') id): Promise<ITour> {
    return this.toursService.getToursById(id);
  }
  @Post()
  async initTours(): Promise<ITour[]> {
    await this.toursService.generateTours();
    return this.toursService.getAllTours();
  }


  @Delete()
  removeAllTours(): void {
    this.toursService.deleteTours();
  }


  @Get()
  getAllTours(): Promise<ITour[]> {
   return  this.toursService.getAllTours();
  }

}
