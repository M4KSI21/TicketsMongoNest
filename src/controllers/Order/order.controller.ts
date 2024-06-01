import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {OrderService} from "../../service/order/order.service";
import {OrderDto} from "../../dto/order-dto";



@Controller('order')
export class OrderController {

  constructor(private  orderService: OrderService) {}



  @Post()
  initTours(@Body() data: OrderDto): void {
    const orderData = new OrderDto(data.age,  data.birthDay,data.cardNumber, data.tourId, data.userId, data.name, data.surname, data.nameTour)
    this.orderService.sendOrder(orderData, data.userId)

  }


  @Get(":userId")
  getOrders(@Param('userId') userId): Promise<OrderDto[]> {
    return this.orderService.getAllOrders(userId)
  }




}
