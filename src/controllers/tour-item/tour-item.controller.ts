import {Body, Controller, Get, Param, Post, UseInterceptors} from '@nestjs/common';
import {ToursService} from "../../service/tours/tours.service";
import {FileInterceptor} from "@nestjs/platform-express";

import {diskStorage} from "multer";
import {ITour, ITourClient} from "../../interfaces/tour";

@Controller('tour-item')
export class TourItemController {

  constructor(private  tourService: ToursService) {}

  static imgName: string;

  @Get(':name')
  getToursByName(@Param('name') tourName: string) {
  return this.tourService.getToursByName(tourName)
  }

  @Post()
  @UseInterceptors(FileInterceptor('img', {
    storage:diskStorage({
      destination: './public/',
      filename: (req, file, cb) => {
        const imgType = file.mimetype.split('/')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const imgName = file.fieldname + '-' + uniqueSuffix + '-'+ imgType[1]

        cb(null, imgName);
        TourItemController.imgName = imgName
      }
    })
  })
  )

  initTours(@Body() body: ITourClient):void {
    body.img = TourItemController.imgName;

    this.tourService.uploadTour(body);
  }
}
