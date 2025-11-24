from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.api.deps import get_db, get_current_user
from app.crud import crud_user, crud_initiative
from app.models.user import User
from app.schemas.initiative import Initiative

router = APIRouter()

class DashboardStats(BaseModel):
    total_students: int
    total_companies: int
    pending_initiatives_count: int
    pending_initiatives: List[Initiative]

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get dashboard statistics. Only for coordinators.
    """
    if current_user.id_rol != 1: # 1 = Coordinator
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    total_students = await crud_user.count_by_role(db, role_id=2)
    total_companies = await crud_user.count_by_role(db, role_id=3)
    pending_initiatives_count = await crud_initiative.count_by_status(db, status="pendiente")
    pending_initiatives = await crud_initiative.get_by_status(db, status="pendiente", limit=5)
    
    return {
        "total_students": total_students,
        "total_companies": total_companies,
        "pending_initiatives_count": pending_initiatives_count,
        "pending_initiatives": pending_initiatives
    }
