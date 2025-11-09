from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.crud.notification import notification as crud_notification
from app.schemas.notification import Notification, NotificationCreate, NotificationUpdate

router = APIRouter()

@router.get("/me", response_model=list[Notification])
async def read_my_notifications(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve notifications for the current authenticated user.
    """
    notifications = await crud_notification.get_notifications_by_user(db, user_id=current_user.id_usuario, skip=skip, limit=limit)
    return notifications

@router.post("/", response_model=Notification)
async def create_notification(
    *,
    db: AsyncSession = Depends(get_db),
    notification_in: NotificationCreate,
    current_user: Any = Depends(get_current_active_user), # Any active user can create notifications (e.g., system notifications)
) -> Any:
    """
    Create new notification.
    """
    # TODO: Add logic to verify if current_user is allowed to create notifications for other users
    notification = await crud_notification.create_notification(db, notification_in)
    return notification

@router.put("/{notification_id}", response_model=Notification)
async def update_notification(
    *,
    db: AsyncSession = Depends(get_db),
    notification_id: int,
    notification_in: NotificationUpdate,
    current_user: Any = Depends(get_current_active_user), # Only recipient or coordinator can update (e.g., mark as read)
) -> Any:
    """
    Update a notification (e.g., mark as read).
    """
    notification = await crud_notification.get_notification(db, notification_id=notification_id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    # Only recipient or coordinator can update the notification
    if notification.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # Assuming 1 is coordinator role
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this notification",
        )
    
    notification = await crud_notification.update_notification(db, notification_id=notification_id, notification_in=notification_in)
    return notification

@router.delete("/{notification_id}", response_model=Notification)
async def delete_notification(
    *,
    db: AsyncSession = Depends(get_db),
    notification_id: int,
    current_user: Any = Depends(get_current_active_user), # Only recipient or coordinator can delete
) -> Any:
    """
    Delete a notification.
    """
    notification = await crud_notification.get_notification(db, notification_id=notification_id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    # Only recipient or coordinator can delete the notification
    if notification.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # Assuming 1 is coordinator role
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this notification",
        )
    
    notification = await crud_notification.delete_notification(db, notification_id=notification_id)
    return notification