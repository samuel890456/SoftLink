from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.audit import Audit
from app.schemas.audit import AuditCreate, AuditUpdate

class CRUDAudit:
    async def get_audit_log(self, db: AsyncSession, log_id: int) -> Audit | None:
        result = await db.execute(select(Audit).where(Audit.id_log == log_id))
        return result.scalar_one_or_none()

    async def get_audit_logs(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[Audit]:
        result = await db.execute(select(Audit).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_audit_log(self, db: AsyncSession, audit_log: AuditCreate) -> Audit:
        db_audit_log = Audit(**audit_log.model_dump())
        db.add(db_audit_log)
        await db.commit()
        await db.refresh(db_audit_log)
        return db_audit_log

    async def update_audit_log(self, db: AsyncSession, log_id: int, audit_log_in: AuditUpdate) -> Audit | None:
        db_audit_log = await self.get_audit_log(db, log_id)
        if not db_audit_log:
            return None
        
        update_data = audit_log_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_audit_log, key, value)
        
        await db.commit()
        await db.refresh(db_audit_log)
        return db_audit_log

    async def delete_audit_log(self, db: AsyncSession, log_id: int) -> Audit | None:
        db_audit_log = await self.get_audit_log(db, log_id)
        if not db_audit_log:
            return None
        await db.delete(db_audit_log)
        await db.commit()
        return db_audit_log

audit = CRUDAudit()