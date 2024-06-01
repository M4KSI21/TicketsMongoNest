import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "../../shemas/order";
import {OrderService} from "../../service/order/order.service";

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
