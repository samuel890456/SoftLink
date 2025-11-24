from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.milestone import Milestone
from app.schemas.milestone import MilestoneCreate, MilestoneUpdate

async def get_by_project(db: AsyncSession, project_id: int):
    result = await db.execute(select(Milestone).filter(Milestone.id_proyecto == project_id))
    return result.scalars().all()

async def get(db: AsyncSession, id: int):
    result = await db.execute(select(Milestone).filter(Milestone.id_hito == id))
    return result.scalar_one_or_none()

async def create(db: AsyncSession, obj_in: MilestoneCreate):
    db_obj = Milestone(**obj_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update(db: AsyncSession, db_obj: Milestone, obj_in: MilestoneUpdate):
    update_data = obj_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def remove(db: AsyncSession, id: int):
    obj = await get(db, id)
    if obj:
        await db.delete(obj)
        await db.commit()
    return obj
