import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Tour, TourDocument} from "../../shemas/tour";
import {Model} from "mongoose";
import {TourDto} from "../../dto/tour-dto";
import {User} from "../../shemas/user";
import {ITour, ITourClient} from "../../interfaces/tour";

@Injectable()
export class ToursService {
  private toursCount = 10;

  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {
  }

  async getToursById(id): Promise<ITour> {
    return this.tourModel.findById(id);
  }

  async generateTours(): Promise<any> {
    for (let i=0; i <= this.toursCount; i++) {
      const tour = new TourDto('name ' + i, 'desc', 'tourOperator', 'price' , `pic${i+1}.jpg`)
      const tourData = new this.tourModel(tour);
       await tourData.save()
    }
  }

  async deleteTours(): Promise<any> {
    return  this.tourModel.deleteMany({})
  }

  async getAllTours(): Promise<ITour[]> {
    return this.tourModel.find()
  }

   async uploadTour(body: ITourClient) {
    const tour = new TourDto(body.name, body.description, body.tourOperator, body.price, body.img)
    const tourData = new this.tourModel(tour)
     await tourData.save();
   }

  async getToursByName(name): Promise<ITour[]> {
    return this.tourModel.find({name: { "$regex": name, "$options": "i" }})

  }
}
