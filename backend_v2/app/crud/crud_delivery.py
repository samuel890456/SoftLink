from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.delivery import Delivery
from app.schemas.delivery import DeliveryCreate

async def get_by_milestone(db: AsyncSession, milestone_id: int):
    result = await db.execute(select(Delivery).filter(Delivery.id_hito == milestone_id))
    return result.scalars().all()

async def get_by_student_and_milestone(db: AsyncSession, student_id: int, milestone_id: int):
    result = await db.execute(
        select(Delivery)
        .filter(Delivery.id_estudiante == student_id, Delivery.id_hito == milestone_id)
    )
    return result.scalar_one_or_none()

async def create(db: AsyncSession, obj_in: DeliveryCreate, student_id: int):
    db_obj = Delivery(
        **obj_in.model_dump(),
        id_estudiante=student_id
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
