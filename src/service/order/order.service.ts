import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../../shemas/order";
import {Model} from "mongoose";
import {OrderDto} from "../../dto/order-dto";



@Injectable()
export class OrderService {

  constructor(@InjectModel(Order.name) private  orderModel: Model<OrderDocument>) { }



  async  sendOrder(data: OrderDto, userId: string): Promise<Order> {
    const orderData = new this.orderModel(data);
    orderData.userId = userId;
    return orderData.save()
  }

  async getAllOrders(userId: string): Promise<OrderDto[]> {
    return this.orderModel.find({userId: userId}).exec();
  }



}
