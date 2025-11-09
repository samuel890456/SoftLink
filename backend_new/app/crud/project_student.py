from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.project_student import ProjectStudent
from app.schemas.project_student import ProjectStudentCreate, ProjectStudentUpdate

class CRUDProjectStudent:
    async def get_project_student(self, db: AsyncSession, project_id: int, student_id: int) -> ProjectStudent | None:
        result = await db.execute(select(ProjectStudent).where(
            ProjectStudent.id_proyecto == project_id,
            ProjectStudent.id_estudiante == student_id
        ))
        return result.scalar_one_or_none()

    async def get_students_for_project(self, db: AsyncSession, project_id: int, skip: int = 0, limit: int = 100) -> list[ProjectStudent]:
        result = await db.execute(select(ProjectStudent).where(ProjectStudent.id_proyecto == project_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def get_projects_for_student(self, db: AsyncSession, student_id: int, skip: int = 0, limit: int = 100) -> list[ProjectStudent]:
        result = await db.execute(select(ProjectStudent).where(ProjectStudent.id_estudiante == student_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_project_student(self, db: AsyncSession, project_student: ProjectStudentCreate) -> ProjectStudent:
        db_project_student = ProjectStudent(**project_student.model_dump())
        db.add(db_project_student)
        await db.commit()
        await db.refresh(db_project_student)
        return db_project_student

    async def update_project_student(self, db: AsyncSession, project_id: int, student_id: int, project_student_in: ProjectStudentUpdate) -> ProjectStudent | None:
        db_project_student = await self.get_project_student(db, project_id, student_id)
        if not db_project_student:
            return None
        
        update_data = project_student_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_project_student, key, value)
        
        await db.commit()
        await db.refresh(db_project_student)
        return db_project_student

    async def delete_project_student(self, db: AsyncSession, project_id: int, student_id: int) -> ProjectStudent | None:
        db_project_student = await self.get_project_student(db, project_id, student_id)
        if not db_project_student:
            return None
        await db.delete(db_project_student)
        await db.commit()
        return db_project_student

project_student = CRUDProjectStudent()