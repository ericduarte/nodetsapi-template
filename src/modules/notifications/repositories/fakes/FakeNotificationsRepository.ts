import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create(
    notificationData: ICreateNotificationDTO,
  ): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), ...notificationData });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
