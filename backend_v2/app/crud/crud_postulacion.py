from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.postulacion import Postulacion
from app.schemas.postulacion import PostulacionCreate, PostulacionUpdate

async def get(db: AsyncSession, id: int):
    result = await db.execute(
        select(Postulacion)
        .options(selectinload(Postulacion.estudiante), selectinload(Postulacion.iniciativa))
        .filter(Postulacion.id_postulacion == id)
    )
    return result.scalar_one_or_none()

async def get_by_student(db: AsyncSession, student_id: int):
    result = await db.execute(
        select(Postulacion)
        .options(selectinload(Postulacion.iniciativa))
        .filter(Postulacion.id_estudiante == student_id)
    )
    return result.scalars().all()

async def get_by_initiative(db: AsyncSession, initiative_id: int):
    result = await db.execute(
        select(Postulacion)
        .options(selectinload(Postulacion.estudiante))
        .filter(Postulacion.id_iniciativa == initiative_id)
    )
    return result.scalars().all()

async def get_pending(db: AsyncSession):
    result = await db.execute(
        select(Postulacion)
        .options(selectinload(Postulacion.estudiante), selectinload(Postulacion.iniciativa))
        .filter(Postulacion.estado == "pendiente")
    )
    return result.scalars().all()

async def create(db: AsyncSession, obj_in: PostulacionCreate, student_id: int):
    db_obj = Postulacion(
        **obj_in.model_dump(),
        id_estudiante=student_id,
        estado="pendiente"
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update(db: AsyncSession, db_obj: Postulacion, obj_in: PostulacionUpdate):
    update_data = obj_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
