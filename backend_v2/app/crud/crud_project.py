from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.project import Project
from app.models.project_student import ProjectStudent
from app.schemas.project import ProjectCreate

async def get_by_initiative(db: AsyncSession, initiative_id: int):
    result = await db.execute(select(Project).filter(Project.id_iniciativa == initiative_id))
    return result.scalar_one_or_none()

async def create(db: AsyncSession, obj_in: ProjectCreate):
    db_obj = Project(**obj_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def add_student(db: AsyncSession, project_id: int, student_id: int, role: str = "Estudiante"):
    db_obj = ProjectStudent(
        id_proyecto=project_id,
        id_estudiante=student_id,
        rol_en_proyecto=role
    )
    db.add(db_obj)
    await db.commit()
    return db_obj
