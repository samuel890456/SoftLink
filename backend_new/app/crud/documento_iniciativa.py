from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.documento_iniciativa import DocumentoIniciativa
from app.schemas.documento_iniciativa import DocumentoIniciativaCreate, DocumentoIniciativaUpdate

class CRUDDocumentoIniciativa:
    async def get_documento(self, db: AsyncSession, doc_id: int) -> DocumentoIniciativa | None:
        result = await db.execute(select(DocumentoIniciativa).where(DocumentoIniciativa.id_doc == doc_id))
        return result.scalar_one_or_none()

    async def get_documentos_by_initiative(self, db: AsyncSession, initiative_id: int, skip: int = 0, limit: int = 100) -> list[DocumentoIniciativa]:
        result = await db.execute(select(DocumentoIniciativa).where(DocumentoIniciativa.id_iniciativa == initiative_id).offset(skip).limit(limit))
        return result.scalars().all()

    async def create_documento(self, db: AsyncSession, documento: DocumentoIniciativaCreate) -> DocumentoIniciativa:
        db_documento = DocumentoIniciativa(**documento.model_dump())
        db.add(db_documento)
        await db.commit()
        await db.refresh(db_documento)
        return db_documento

    async def update_documento(self, db: AsyncSession, doc_id: int, documento_in: DocumentoIniciativaUpdate) -> DocumentoIniciativa | None:
        db_documento = await self.get_documento(db, doc_id)
        if not db_documento:
            return None
        
        update_data = documento_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_documento, key, value)
        
        await db.commit()
        await db.refresh(db_documento)
        return db_documento

    async def delete_documento(self, db: AsyncSession, doc_id: int) -> DocumentoIniciativa | None:
        db_documento = await self.get_documento(db, doc_id)
        if not db_documento:
            return None
        await db.delete(db_documento)
        await db.commit()
        return db_documento

documento_iniciativa = CRUDDocumentoIniciativa()