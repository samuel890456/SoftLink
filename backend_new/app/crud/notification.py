from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate

class CRUDNotification:
    async def get_notification(self, db: AsyncSession, notification_id: int) -> Notification | None:
        result = await db.execute(select(Notification).where(Notification.id_notificacion == notification_id))
        return result.scalar_one_or_none()

    async def get_notifications_by_user(self, db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100) -> list[Notification]:
        result = await db.execute(select(Notification).where(Notification.id_usuario == user_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_notification(self, db: AsyncSession, notification: NotificationCreate) -> Notification:
        db_notification = Notification(**notification.model_dump())
        db.add(db_notification)
        await db.commit()
        await db.refresh(db_notification)
        return db_notification

    async def update_notification(self, db: AsyncSession, notification_id: int, notification_in: NotificationUpdate) -> Notification | None:
        db_notification = await self.get_notification(db, notification_id)
        if not db_notification:
            return None
        
        update_data = notification_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_notification, key, value)
        
        await db.commit()
        await db.refresh(db_notification)
        return db_notification

    async def delete_notification(self, db: AsyncSession, notification_id: int) -> Notification | None:
        db_notification = await self.get_notification(db, notification_id)
        if not db_notification:
            return None
        await db.delete(db_notification)
        await db.commit()
        return db_notification

notification = CRUDNotification()