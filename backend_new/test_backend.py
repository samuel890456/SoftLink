"""
Script para probar la conexión del backend y verificar que esté funcionando correctamente.
Ejecuta este script para diagnosticar problemas de conexión.
"""
import asyncio
import sys
from app.db.session import AsyncSessionLocal
from app.core.config import settings
from sqlalchemy import text

async def test_connection():
    """Prueba la conexión a la base de datos"""
    print("Testing database connection...")
    print(f"DATABASE_URL: {settings.DATABASE_URL}")
    
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1"))
            print("✅ Database connection successful!")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\nPossible issues:")
        print("1. PostgreSQL is not running")
        print("2. DATABASE_URL is incorrect")
        print("3. Database doesn't exist")
        print(f"\nCurrent DATABASE_URL: {settings.DATABASE_URL}")
        print("\nIf you're running the backend directly (not in Docker),")
        print("you may need to change DATABASE_URL to: postgresql+asyncpg://postgres:admin@localhost:5432/plataforma_desarrollo")
        return False

async def test_cors_config():
    """Verifica la configuración de CORS"""
    print("\nTesting CORS configuration...")
    print(f"BACKEND_CORS_ORIGINS: {settings.BACKEND_CORS_ORIGINS}")
    print("✅ CORS configuration loaded")

if __name__ == "__main__":
    print("=" * 50)
    print("Backend Diagnostic Tool")
    print("=" * 50)
    
    # Test CORS config
    asyncio.run(test_cors_config())
    
    # Test database connection
    success = asyncio.run(test_connection())
    
    print("\n" + "=" * 50)
    if success:
        print("✅ All tests passed!")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        sys.exit(1)

