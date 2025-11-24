from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalar_one_or_none()

async def get_user_by_id(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).filter(User.id_usuario == user_id))
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        nombre=user.nombre,
        password=hashed_password,
        telefono=user.telefono,
        github=user.github,
        tecnologias=user.tecnologias,
        bio=user.bio,
        sitio_web=user.sitio_web,
        id_rol=user.id_rol
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_user(db: AsyncSession, user_id: int, user_update: UserUpdate):
    user = await get_user_by_id(db, user_id)
    if not user:
        return None
    
    # Update only provided fields
    update_data = user_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    await db.commit()
    await db.refresh(user)
    return user

async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()

async def count_by_role(db: AsyncSession, role_id: int):
    result = await db.execute(select(func.count(User.id_usuario)).filter(User.id_rol == role_id))
    return result.scalar_one()
