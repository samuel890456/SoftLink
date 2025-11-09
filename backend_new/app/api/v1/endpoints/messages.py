from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.crud.message import message as crud_message
from app.schemas.message import Message, MessageCreate, MessageUpdate

router = APIRouter()

@router.get("/me", response_model=list[Message])
async def read_my_messages(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve messages for the current authenticated user (sent and received).
    """
    messages = await crud_message.get_messages_by_user(db, user_id=current_user.id_usuario, skip=skip, limit=limit)
    return messages

@router.post("/", response_model=Message)
async def create_message(
    *,
    db: AsyncSession = Depends(get_db),
    message_in: MessageCreate,
    current_user: Any = Depends(get_current_active_user), # Any active user can send messages
) -> Any:
    """
    Create new message.
    """
    message_in.id_remitente = current_user.id_usuario # Set sender to current user
    message = await crud_message.create_message(db, message_in)
    return message

@router.put("/{message_id}", response_model=Message)
async def update_message(
    *,
    db: AsyncSession = Depends(get_db),
    message_id: int,
    message_in: MessageUpdate,
    current_user: Any = Depends(get_current_active_user), # Only sender/receiver can update (e.g., mark as read)
) -> Any:
    """
    Update a message (e.g., mark as read).
    """
    message = await crud_message.get_message(db, message_id=message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found",
        )
    
    # Only sender or receiver can update the message
    if message.id_remitente != current_user.id_usuario and message.id_destinatario != current_user.id_usuario:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this message",
        )
    
    message = await crud_message.update_message(db, message_id=message_id, message_in=message_in)
    return message

@router.delete("/{message_id}", response_model=Message)
async def delete_message(
    *,
    db: AsyncSession = Depends(get_db),
    message_id: int,
    current_user: Any = Depends(get_current_active_user), # Only sender/receiver can delete
) -> Any:
    """
    Delete a message.
    """
    message = await crud_message.get_message(db, message_id=message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found",
        )
    
    # Only sender or receiver can delete the message
    if message.id_remitente != current_user.id_usuario and message.id_destinatario != current_user.id_usuario:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this message",
        )
    
    message = await crud_message.delete_message(db, message_id=message_id)
    return message