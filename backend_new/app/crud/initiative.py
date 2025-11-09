from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.initiative import Initiative
from app.schemas.initiative import InitiativeCreate, InitiativeUpdate

class CRUDInitiative:
    async def get_initiative(self, db: AsyncSession, initiative_id: int) -> Initiative | None:
        result = await db.execute(select(Initiative).where(Initiative.id_iniciativa == initiative_id))
        return result.scalar_one_or_none()

    async def get_initiatives(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[Initiative]:
        result = await db.execute(select(Initiative).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_initiative(self, db: AsyncSession, initiative: InitiativeCreate) -> Initiative:
        db_initiative = Initiative(**initiative.model_dump())
        db.add(db_initiative)
        await db.commit()
        await db.refresh(db_initiative)
        return db_initiative

    async def update_initiative(self, db: AsyncSession, initiative_id: int, initiative_in: InitiativeUpdate) -> Initiative | None:
        db_initiative = await self.get_initiative(db, initiative_id)
        if not db_initiative:
            return None
        
        update_data = initiative_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_initiative, key, value)
        
        await db.commit()
        await db.refresh(db_initiative)
        return db_initiative

    async def delete_initiative(self, db: AsyncSession, initiative_id: int) -> Initiative | None:
        db_initiative = await self.get_initiative(db, initiative_id)
        if not db_initiative:
            return None
        await db.delete(db_initiative)
        await db.commit()
        return db_initiative

iniciative = CRUDInitiative()