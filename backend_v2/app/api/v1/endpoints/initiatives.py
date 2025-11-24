from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_user
from app.crud import crud_initiative
from app.schemas.initiative import Initiative, InitiativeCreate, InitiativeUpdate
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Initiative])
async def read_initiatives(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve initiatives. Public access.
    """
    initiatives = await crud_initiative.get_multi(db, skip=skip, limit=limit)
    return initiatives

@router.post("/", response_model=Initiative)
async def create_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    initiative_in: InitiativeCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create new initiative.
    """
    initiative = await crud_initiative.create(db=db, obj_in=initiative_in, owner_id=current_user.id_usuario)
    return initiative

@router.get("/{id}", response_model=Initiative)
async def read_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
):
    """
    Get initiative by ID. Public access.
    """
    initiative = await crud_initiative.get(db=db, id=id)
    if not initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")
    return initiative

@router.put("/{id}", response_model=Initiative)
async def update_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    initiative_in: InitiativeUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update an initiative.
    """
    initiative = await crud_initiative.get(db=db, id=id)
    if not initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")
    if initiative.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # 1 is Coordinator
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    initiative = await crud_initiative.update(db=db, db_obj=initiative, obj_in=initiative_in)
    return initiative

@router.delete("/{id}", response_model=Initiative)
async def delete_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    current_user: User = Depends(get_current_user)
):
    """
    Delete an initiative.
    """
    initiative = await crud_initiative.get(db=db, id=id)
    if not initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")
    if initiative.id_usuario != current_user.id_usuario and current_user.id_rol != 1:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    initiative = await crud_initiative.remove(db=db, id=id)
    return initiative
