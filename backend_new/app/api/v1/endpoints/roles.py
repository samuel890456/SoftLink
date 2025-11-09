from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api.deps import get_db
from app.models.role import Role as DBRole # Alias to avoid conflict with schema Role
from app.schemas.role import Role # Pydantic schema for response

router = APIRouter()

@router.get("/roles", response_model=List[Role])
async def read_roles(
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Retrieve all roles.
    """
    result = await db.execute(select(DBRole))
    roles = result.scalars().all()
    return roles
