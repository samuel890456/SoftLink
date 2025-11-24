from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.base import Base
from app.db.session import engine
from app.models.role import Role

async def init_db(db: AsyncSession) -> None:
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Create initial roles
    roles_data = [
        {"nombre": "coordinador", "descripcion": "Supervisa proyectos, aprueba iniciativas y evalúa estudiantes"},
        {"nombre": "estudiante", "descripcion": "Participa en proyectos y desarrolla soluciones tecnológicas"},
        {"nombre": "empresa", "descripcion": "Registra iniciativas y evalúa resultados"},
    ]
    
    for role_data in roles_data:
        result = await db.execute(select(Role).filter(Role.nombre == role_data["nombre"]))
        existing_role = result.scalar_one_or_none()
        
        if not existing_role:
            db_role = Role(**role_data)
            db.add(db_role)
    
    await db.commit()
