import sys
import os

# Add the current directory to sys.path
sys.path.append(os.getcwd())

try:
    from app.db.base import Base
    print("Models imported successfully.")
    # Try to configure mappers
    from sqlalchemy.orm import configure_mappers
    configure_mappers()
    print("Mappers configured successfully.")
except Exception as e:
    print("Error importing models or configuring mappers:")
    print(e)
    import traceback
    traceback.print_exc()
