from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

class CRUDProject:
    async def get_project(self, db: AsyncSession, project_id: int) -> Project | None:
        result = await db.execute(select(Project).where(Project.id_proyecto == project_id))
        return result.scalar_one_or_none()

    async def get_projects(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[Project]:
        result = await db.execute(select(Project).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_project(self, db: AsyncSession, project: ProjectCreate) -> Project:
        db_project = Project(**project.model_dump())
        db.add(db_project)
        await db.commit()
        await db.refresh(db_project)
        return db_project

    async def update_project(self, db: AsyncSession, project_id: int, project_in: ProjectUpdate) -> Project | None:
        db_project = await self.get_project(db, project_id)
        if not db_project:
            return None
        
        update_data = project_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_project, key, value)
        
        await db.commit()
        await db.refresh(db_project)
        return db_project

    async def delete_project(self, db: AsyncSession, project_id: int) -> Project | None:
        db_project = await self.get_project(db, project_id)
        if not db_project:
            return None
        await db.delete(db_project)
        await db.commit()
        return db_project

project = CRUDProject()