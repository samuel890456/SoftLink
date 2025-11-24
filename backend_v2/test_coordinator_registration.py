import asyncio
import logging
from app.db.session import AsyncSessionLocal
from app.core.security import get_password_hash
# Import base to register all models
import app.db.base
from app.models.user import User
from app.models.role import Role
from sqlalchemy.future import select

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_coordinator_registration():
    async with AsyncSessionLocal() as session:
        try:
            # Verificar si el rol coordinador existe
            result = await session.execute(select(Role).filter(Role.nombre == "coordinador"))
            role_coordinator = result.scalars().first()
            
            if not role_coordinator:
                logger.error("El rol 'coordinador' no existe. Asegúrate de que la base de datos esté inicializada.")
                return

            # Datos del coordinador a registrar
            email = "admin@softlink.edu"
            password = "admin123"
            
            # Verificar si ya existe
            result = await session.execute(select(User).filter(User.email == email))
            existing_user = result.scalars().first()

            if existing_user:
                logger.info(f"El usuario coordinador {email} ya existe.")
                return

            new_coordinator = User(
                nombre="Administrador Principal",
                email=email,
                password=get_password_hash(password),
                id_rol=role_coordinator.id_rol,
                bio="Administrador del sistema SoftLink",
                telefono="1234567890",
                tecnologias="Gestión, Liderazgo"
            )

            session.add(new_coordinator)
            await session.commit()
            logger.info(f"Usuario coordinador creado exitosamente: {email} / {password}")

        except Exception as e:
            logger.error(f"Error creando coordinador: {e}")
            await session.rollback()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(test_coordinator_registration())
