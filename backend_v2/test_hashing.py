from app.core.security import get_password_hash

try:
    password = "12345678"
    print(f"Hashing password: {password}")
    hashed = get_password_hash(password)
    print(f"Hashed successfully: {hashed}")
except Exception as e:
    print(f"Error hashing password: {e}")
    import traceback
    traceback.print_exc()
