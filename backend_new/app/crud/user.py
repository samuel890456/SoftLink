from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload # Import selectinload
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash

class CRUDUser:
    async def get_user(self, db: AsyncSession, user_id: int) -> User | None:
        result = await db.execute(
            select(User).options(selectinload(User.role)).where(User.id_usuario == user_id)
        )
        return result.scalar_one_or_none()

    async def get_user_by_email(self, db: AsyncSession, email: str) -> User | None:
        result = await db.execute(
            select(User).options(selectinload(User.role)).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def get_users(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[User]:
        result = await db.execute(
            select(User).options(selectinload(User.role)).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def create_user(self, db: AsyncSession, user: UserCreate) -> User:
        hashed_password = get_password_hash(user.password)
        db_user = User(
            nombre=user.nombre,
            email=user.email,
            password=hashed_password,
            telefono=user.telefono,
            github=user.github,
            tecnologias=user.tecnologias,
            foto=user.foto,
            id_rol=user.id_rol if user.id_rol is not None else 1 # Assign default role 1 (Coordinator)
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        # After committing, re-query the user to load the 'role' relationship
        loaded_user = await db.execute(
            select(User).options(selectinload(User.role)).where(User.id_usuario == db_user.id_usuario)
        )
        return loaded_user.scalar_one()

    async def update_user(self, db: AsyncSession, user_id: int, user_in: UserUpdate) -> User | None:
        db_user = await self.get_user(db, user_id)
        if not db_user:
            return None
        
        update_data = user_in.model_dump(exclude_unset=True)
        if "password" in update_data and update_data["password"]:
            update_data["password"] = get_password_hash(update_data["password"])
        
        for key, value in update_data.items():
            setattr(db_user, key, value)
        
        await db.commit()
        await db.refresh(db_user)
        return db_user

    async def delete_user(self, db: AsyncSession, user_id: int) -> User | None:
        db_user = await self.get_user(db, user_id)
        if not db_user:
            return None
        await db.delete(db_user)
        await db.commit()
        return db_user

user = CRUDUser()