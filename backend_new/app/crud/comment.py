from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.comment import Comment
from app.schemas.comment import CommentCreate, CommentUpdate

class CRUDComment:
    async def get_comment(self, db: AsyncSession, comment_id: int) -> Comment | None:
        result = await db.execute(select(Comment).where(Comment.id_comentario == comment_id))
        return result.scalar_one_or_none()

    async def get_comments_by_project(self, db: AsyncSession, project_id: int, skip: int = 0, limit: int = 100) -> list[Comment]:
        result = await db.execute(select(Comment).where(Comment.id_proyecto == project_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_comment(self, db: AsyncSession, comment: CommentCreate) -> Comment:
        db_comment = Comment(**comment.model_dump())
        db.add(db_comment)
        await db.commit()
        await db.refresh(db_comment)
        return db_comment

    async def update_comment(self, db: AsyncSession, comment_id: int, comment_in: CommentUpdate) -> Comment | None:
        db_comment = await self.get_comment(db, comment_id)
        if not db_comment:
            return None
        
        update_data = comment_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_comment, key, value)
        
        await db.commit()
        await db.refresh(db_comment)
        return db_comment

    async def delete_comment(self, db: AsyncSession, comment_id: int) -> Comment | None:
        db_comment = await self.get_comment(db, comment_id)
        if not db_comment:
            return None
        await db.delete(db_comment)
        await db.commit()
        return db_comment

comment = CRUDComment()