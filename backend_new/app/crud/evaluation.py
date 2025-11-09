from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.evaluation import Evaluation
from app.schemas.evaluation import EvaluationCreate, EvaluationUpdate

class CRUDEvaluation:
    async def get_evaluation(self, db: AsyncSession, eval_id: int) -> Evaluation | None:
        result = await db.execute(select(Evaluation).where(Evaluation.id_eval == eval_id))
        return result.scalar_one_or_none()

    async def get_evaluations_by_project(self, db: AsyncSession, project_id: int, skip: int = 0, limit: int = 100) -> list[Evaluation]:
        result = await db.execute(select(Evaluation).where(Evaluation.id_proyecto == project_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_evaluation(self, db: AsyncSession, evaluation: EvaluationCreate) -> Evaluation:
        db_evaluation = Evaluation(**evaluation.model_dump())
        db.add(db_evaluation)
        await db.commit()
        await db.refresh(db_evaluation)
        return db_evaluation

    async def update_evaluation(self, db: AsyncSession, eval_id: int, evaluation_in: EvaluationUpdate) -> Evaluation | None:
        db_evaluation = await self.get_evaluation(db, eval_id)
        if not db_evaluation:
            return None
        
        update_data = evaluation_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_evaluation, key, value)
        
        await db.commit()
        await db.refresh(db_evaluation)
        return db_evaluation

    async def delete_evaluation(self, db: AsyncSession, eval_id: int) -> Evaluation | None:
        db_evaluation = await self.get_evaluation(db, eval_id)
        if not db_evaluation:
            return None
        await db.delete(db_evaluation)
        await db.commit()
        return db_evaluation

evaluation = CRUDEvaluation()