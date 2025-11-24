# Solución para Error de CORS

## Problema
El error de CORS ocurre cuando el frontend (localhost:5173) intenta hacer peticiones al backend (localhost:8000) y el backend no tiene configurado correctamente CORS para permitir estas peticiones.

## Solución Implementada

### 1. Configuración de CORS en `backend_new/app/main.py`
Se actualizó la configuración de CORS para ser más permisiva en desarrollo:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ] + (settings.BACKEND_CORS_ORIGINS if settings.BACKEND_CORS_ORIGINS else []),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)
```

### 2. Verificación del Backend

**IMPORTANTE**: Para que los cambios surtan efecto, necesitas:

1. **Reiniciar el servidor backend**:
   ```bash
   cd backend_new
   # Si usas Docker:
   docker-compose restart
   # O si ejecutas directamente:
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Verificar que el backend esté corriendo**:
   - Abre tu navegador y ve a: `http://localhost:8000`
   - Deberías ver: `{"message": "Welcome to SoftLink Backend API!"}`
   - También puedes verificar la documentación en: `http://localhost:8000/docs`

3. **Verificar la conexión a la base de datos**:
   - Asegúrate de que PostgreSQL esté corriendo
   - Verifica que la URL de conexión en `config.py` sea correcta
   - Si usas Docker, verifica que el contenedor de la base de datos esté corriendo

### 3. Posibles Problemas Adicionales

#### Error 500 (Internal Server Error)
Si además del error de CORS ves un error 500, puede ser debido a:

1. **Problema con la base de datos**:
   - Verifica que PostgreSQL esté corriendo
   - Verifica que las tablas existan
   - Verifica los logs del backend para ver el error específico

2. **Problema con la verificación de contraseñas**:
   - Las contraseñas deben estar hasheadas con bcrypt
   - Si registraste un usuario antes de implementar el hashing, las contraseñas antiguas no funcionarán
   - Solución: Registra un nuevo usuario o actualiza las contraseñas existentes

3. **Problema con imports**:
   - Verifica que todos los módulos estén correctamente importados
   - Verifica que `TokenResponse` esté definido en `app/schemas/login_response.py`

### 4. Verificación Final

Después de reiniciar el backend:

1. Abre la consola del navegador (F12)
2. Intenta hacer login
3. Verifica que:
   - No haya errores de CORS
   - La petición se complete exitosamente
   - El token se guarde en localStorage

### 5. Si el Problema Persiste

Si después de reiniciar el backend aún tienes problemas:

1. **Verifica los logs del backend**:
   ```bash
   # Si usas Docker:
   docker-compose logs -f backend
   
   # O si ejecutas directamente, los logs aparecerán en la terminal
   ```

2. **Verifica que el frontend esté usando la URL correcta**:
   - En `Frontend/src/services/api.js`, verifica que `API_URL` sea `http://localhost:8000/api/v1/`

3. **Prueba hacer una petición manual**:
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/login" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=tu_email@ejemplo.com&password=tu_contraseña"
   ```

4. **Verifica que el backend esté escuchando en el puerto correcto**:
   - El backend debe estar en el puerto 8000
   - Verifica que no haya otro proceso usando ese puerto

## Comandos Útiles

```bash
# Ver procesos usando el puerto 8000 (Linux/Mac)
lsof -i :8000

# Ver procesos usando el puerto 8000 (Windows)
netstat -ano | findstr :8000

# Reiniciar el backend con Docker
docker-compose restart

# Ver logs del backend
docker-compose logs -f backend

# Ejecutar el backend manualmente
cd backend_new
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

