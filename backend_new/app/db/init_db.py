import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import Base
from app.db.session import engine
from app.models.role import Role
from app.models.user import User # Import other models as they are created

async def init_db(db: AsyncSession) -> None:
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Create initial roles if they don't exist
    roles_data = [
        {"nombre": "coordinador", "descripcion": "Supervisa proyectos, aprueba iniciativas y evalúa estudiantes"},
        {"nombre": "estudiante", "descripcion": "Participa en proyectos y desarrolla soluciones tecnológicas"},
        {"nombre": "empresa", "descripcion": "Registra iniciativas y evalúa resultados"},
    ]

    for role_data in roles_data:
        existing_role = await db.execute(
            Role.__table__.select().where(Role.nombre == role_data["nombre"])
        )
        if not existing_role.scalar_one_or_none():
            db_role = Role(**role_data)
            db.add(db_role)
    await db.commit()

if __name__ == "__main__":
    # This part is for running the script directly to initialize the DB
    # In a real application, you might call init_db from your main.py or a separate script
    async def main():
        async with AsyncSessionLocal() as session:
            await init_db(session)
            print("Database initialized and roles created!")

    from app.db.session import AsyncSessionLocal # Import here to avoid circular dependency

    asyncio.run(main())