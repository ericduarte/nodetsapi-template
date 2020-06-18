import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(
    notificationData: ICreateNotificationDTO,
  ): Promise<Notification> {
    const notification = await this.ormRepository.create(notificationData);

    this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
