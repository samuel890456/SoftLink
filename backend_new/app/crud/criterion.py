from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.criterion import Criterion
from app.schemas.criterion import CriterionCreate, CriterionUpdate

class CRUDCriterion:
    async def get_criterion(self, db: AsyncSession, criterion_id: int) -> Criterion | None:
        result = await db.execute(select(Criterion).where(Criterion.id_criterio == criterion_id))
        return result.scalar_one_or_none()

    async def get_criteria(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[Criterion]:
        result = await db.execute(select(Criterion).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_criterion(self, db: AsyncSession, criterion: CriterionCreate) -> Criterion:
        db_criterion = Criterion(**criterion.model_dump())
        db.add(db_criterion)
        await db.commit()
        await db.refresh(db_criterion)
        return db_criterion

    async def update_criterion(self, db: AsyncSession, criterion_id: int, criterion_in: CriterionUpdate) -> Criterion | None:
        db_criterion = await self.get_criterion(db, criterion_id)
        if not db_criterion:
            return None
        
        update_data = criterion_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_criterion, key, value)
        
        await db.commit()
        await db.refresh(db_criterion)
        return db_criterion

    async def delete_criterion(self, db: AsyncSession, criterion_id: int) -> Criterion | None:
        db_criterion = await self.get_criterion(db, criterion_id)
        if not db_criterion:
            return None
        await db.delete(db_criterion)
        await db.commit()
        return db_criterion

criterion = CRUDCriterion()