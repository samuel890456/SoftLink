from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageUpdate

class CRUDMessage:
    async def get_message(self, db: AsyncSession, message_id: int) -> Message | None:
        result = await db.execute(select(Message).where(Message.id_mensaje == message_id))
        return result.scalar_one_or_none()

    async def get_messages_by_user(self, db: AsyncSession, user_id: int, skip: int = 0, limit: int = 100) -> list[Message]:
        result = await db.execute(select(Message).where(
            (Message.id_remitente == user_id) | (Message.id_destinatario == user_id)
        ).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_message(self, db: AsyncSession, message: MessageCreate) -> Message:
        db_message = Message(**message.model_dump())
        db.add(db_message)
        await db.commit()
        await db.refresh(db_message)
        return db_message

    async def update_message(self, db: AsyncSession, message_id: int, message_in: MessageUpdate) -> Message | None:
        db_message = await self.get_message(db, message_id)
        if not db_message:
            return None
        
        update_data = message_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_message, key, value)
        
        await db.commit()
        await db.refresh(db_message)
        return db_message

    async def delete_message(self, db: AsyncSession, message_id: int) -> Message | None:
        db_message = await self.get_message(db, message_id)
        if not db_message:
            return None
        await db.delete(db_message)
        await db.commit()
        return db_message

message = CRUDMessage()