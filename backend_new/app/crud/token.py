from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.token import Token
from datetime import datetime

class CRUDToken:
    async def create_token(self, db: AsyncSession, user_id: int, token_str: str, token_type: str = "auth", expires_at: datetime | None = None) -> Token:
        db_token = Token(
            id_usuario=user_id,
            token=token_str,
            tipo=token_type,
            fecha_expiracion=expires_at
        )
        db.add(db_token)
        await db.commit()
        await db.refresh(db_token)
        return db_token

    async def get_token_by_token_str(self, db: AsyncSession, token_str: str) -> Token | None:
        result = await db.execute(select(Token).where(Token.token == token_str))
        return result.scalar_one_or_none()

    async def delete_token(self, db: AsyncSession, token_id: int) -> Token | None:
        db_token = await db.get(Token, token_id)
        if not db_token:
            return None
        await db.delete(db_token)
        await db.commit()
        return db_token

token = CRUDToken()