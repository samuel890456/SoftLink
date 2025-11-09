from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.milestone import Hito
from app.schemas.milestone import MilestoneCreate, MilestoneUpdate

class CRUDMilestone:
    async def get_milestone(self, db: AsyncSession, milestone_id: int) -> Hito | None:
        result = await db.execute(select(Hito).where(Hito.id_hito == milestone_id))
        return result.scalar_one_or_none()

    async def get_milestones_by_project(self, db: AsyncSession, project_id: int, skip: int = 0, limit: int = 100) -> list[Hito]:
        result = await db.execute(select(Hito).where(Hito.id_proyecto == project_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_milestone(self, db: AsyncSession, milestone: MilestoneCreate) -> Hito:
        db_milestone = Hito(**milestone.model_dump())
        db.add(db_milestone)
        await db.commit()
        await db.refresh(db_milestone)
        return db_milestone

    async def update_milestone(self, db: AsyncSession, milestone_id: int, milestone_in: MilestoneUpdate) -> Hito | None:
        db_milestone = await self.get_milestone(db, milestone_id)
        if not db_milestone:
            return None
        
        update_data = milestone_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_milestone, key, value)
        
        await db.commit()
        await db.refresh(db_milestone)
        return db_milestone

    async def delete_milestone(self, db: AsyncSession, milestone_id: int) -> Hito | None:
        db_milestone = await self.get_milestone(db, milestone_id)
        if not db_milestone:
            return None
        await db.delete(db_milestone)
        await db.commit()
        return db_milestone

milestone = CRUDMilestone()