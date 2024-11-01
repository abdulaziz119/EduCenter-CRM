import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { PaymentEntity } from '../../entity/payment.entity';

export const paymentProviders = [
  {
    provide: MODELS.PAYMENTS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentEntity),
    inject: [EDUCATION_SOURCE],
  },
];
