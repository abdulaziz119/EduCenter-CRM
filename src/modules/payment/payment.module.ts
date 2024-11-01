import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { paymentProviders } from './payment.providers';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [...paymentProviders, PaymentService],
})
export class PaymentModule {}
