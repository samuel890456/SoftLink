from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from app.models.initiative import Initiative
from app.schemas.initiative import InitiativeCreate, InitiativeUpdate

async def get(db: AsyncSession, id: int):
    result = await db.execute(select(Initiative).filter(Initiative.id_iniciativa == id))
    return result.scalar_one_or_none()

async def get_multi(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Initiative).offset(skip).limit(limit))
    return result.scalars().all()

async def get_by_owner(db: AsyncSession, owner_id: int, skip: int = 0, limit: int = 100):
    result = await db.execute(
        select(Initiative)
        .filter(Initiative.id_usuario == owner_id)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def create(db: AsyncSession, obj_in: InitiativeCreate, owner_id: int):
    db_obj = Initiative(
        **obj_in.model_dump(),
        id_usuario=owner_id
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update(db: AsyncSession, db_obj: Initiative, obj_in: InitiativeUpdate):
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

async def count_by_status(db: AsyncSession, status: str):
    result = await db.execute(select(func.count(Initiative.id_iniciativa)).filter(Initiative.estado == status))
    return result.scalar_one()

async def get_by_status(db: AsyncSession, status: str, skip: int = 0, limit: int = 100):
    result = await db.execute(
        select(Initiative)
        .filter(Initiative.estado == status)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()
