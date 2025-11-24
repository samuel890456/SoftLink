from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.postulacion import Postulacion
from app.schemas.postulacion import PostulacionCreate, PostulacionUpdate

class CRUDPostulacion(CRUDBase[Postulacion, PostulacionCreate, PostulacionUpdate]):
    def create_with_student(
        self, db: Session, *, obj_in: PostulacionCreate, id_estudiante: int
    ) -> Postulacion:
        db_obj = Postulacion(
            id_iniciativa=obj_in.id_iniciativa,
            id_estudiante=id_estudiante,
            mensaje=obj_in.mensaje,
            estado="pendiente"
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_student(
        self, db: Session, *, id_estudiante: int, skip: int = 0, limit: int = 100
    ) -> List[Postulacion]:
        return (
            db.query(self.model)
            .filter(Postulacion.id_estudiante == id_estudiante)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_initiative(
        self, db: Session, *, id_iniciativa: int, skip: int = 0, limit: int = 100
    ) -> List[Postulacion]:
        return (
            db.query(self.model)
            .filter(Postulacion.id_iniciativa == id_iniciativa)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_multi_by_status(
        self, db: Session, *, estado: str, skip: int = 0, limit: int = 100
    ) -> List[Postulacion]:
        return (
            db.query(self.model)
            .filter(Postulacion.estado == estado)
            .offset(skip)
            .limit(limit)
            .all()
        )

postulacion = CRUDPostulacion(Postulacion)
