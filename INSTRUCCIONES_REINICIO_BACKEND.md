# Instrucciones para Reiniciar el Backend y Solucionar CORS

## 🔴 PROBLEMA ACTUAL
El error de CORS y el error 500 indican que el backend necesita ser reiniciado después de los cambios realizados.

## ✅ SOLUCIÓN PASO A PASO

### Paso 1: Detener el Backend Actual

**Si usas Docker:**
```bash
cd backend_new
docker-compose down
```

**Si ejecutas directamente:**
- Presiona `Ctrl+C` en la terminal donde está corriendo el backend

### Paso 2: Verificar la Configuración de la Base de Datos

**IMPORTANTE**: Verifica cómo estás ejecutando el backend:

#### Opción A: Si usas Docker (recomendado)
El `DATABASE_URL` debería ser: `postgresql://postgres:admin@db:5432/plataforma_desarrollo`
- Esto está configurado por defecto
- Asegúrate de que Docker Compose esté corriendo

#### Opción B: Si ejecutas el backend directamente (sin Docker)
Necesitas cambiar el `DATABASE_URL` en `backend_new/app/core/config.py`:

```python
DATABASE_URL: str = "postgresql+asyncpg://postgres:admin@localhost:5432/plataforma_desarrollo"
```

**Nota**: Necesitarás instalar `asyncpg`:
```bash
pip install asyncpg
```

### Paso 3: Reiniciar el Backend

**Si usas Docker:**
```bash
cd backend_new
docker-compose up -d --build
# Ver los logs:
docker-compose logs -f backend
```

**Si ejecutas directamente:**
```bash
cd backend_new
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Paso 4: Verificar que el Backend Esté Funcionando

1. **Abre tu navegador** y ve a: `http://localhost:8000`
   - Deberías ver: `{"message": "Welcome to SoftLink Backend API!"}`

2. **Verifica la documentación** en: `http://localhost:8000/docs`
   - Deberías ver la documentación interactiva de la API

3. **Prueba el endpoint de login** desde la documentación:
   - Ve a `/api/v1/auth/login`
   - Haz clic en "Try it out"
   - Ingresa credenciales de prueba
   - Verifica que funcione

### Paso 5: Verificar los Logs

**Si usas Docker:**
```bash
docker-compose logs -f backend
```

**Si ejecutas directamente:**
- Los logs aparecerán en la terminal donde ejecutaste uvicorn

**Busca estos mensajes:**
- ✅ `Database initialized and roles created on startup!`
- ❌ Cualquier error de conexión a la base de datos
- ❌ Cualquier error de importación

### Paso 6: Probar desde el Frontend

1. **Abre el frontend** en: `http://localhost:5173`
2. **Intenta hacer login**
3. **Abre la consola del navegador** (F12)
4. **Verifica que:**
   - No haya errores de CORS
   - La petición se complete exitosamente
   - El token se guarde en localStorage

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "Database connection failed"

**Causa**: PostgreSQL no está corriendo o la URL es incorrecta

**Solución**:
1. **Si usas Docker:**
   ```bash
   docker-compose up -d db
   # Espera unos segundos para que la base de datos inicie
   docker-compose up -d backend
   ```

2. **Si ejecutas directamente:**
   - Asegúrate de que PostgreSQL esté corriendo
   - Verifica que la base de datos `plataforma_desarrollo` exista
   - Verifica que el usuario `postgres` tenga la contraseña `admin`

### Error: "No module named 'asyncpg'"

**Causa**: Falta instalar asyncpg

**Solución**:
```bash
cd backend_new
pip install asyncpg
```

### Error: "CORS still not working"

**Causa**: El backend no se reinició correctamente

**Solución**:
1. Asegúrate de que el backend se haya reiniciado completamente
2. Verifica que los cambios en `main.py` se hayan guardado
3. Verifica los logs del backend para ver si hay errores al iniciar
4. Prueba acceder directamente a `http://localhost:8000` en el navegador

### Error: "500 Internal Server Error"

**Causa**: Error en el código del backend o en la conexión a la base de datos

**Solución**:
1. Revisa los logs del backend para ver el error específico
2. Verifica que la base de datos esté corriendo
3. Verifica que todas las tablas existan
4. Prueba ejecutar el script de diagnóstico: `python test_backend.py`

## 📝 CAMBIOS REALIZADOS

1. ✅ Configuración de CORS mejorada en `main.py`
2. ✅ Manejo de excepciones global con headers de CORS
3. ✅ Manejo de errores mejorado en el endpoint de login
4. ✅ Logs mejorados para debugging

## 🚀 VERIFICACIÓN FINAL

Después de reiniciar el backend, verifica que:

1. ✅ El backend responde en `http://localhost:8000`
2. ✅ La documentación funciona en `http://localhost:8000/docs`
3. ✅ El endpoint de login funciona desde la documentación
4. ✅ El frontend puede hacer login sin errores de CORS
5. ✅ Los logs no muestran errores

## 📞 SI EL PROBLEMA PERSISTE

1. **Revisa los logs del backend** para ver el error específico
2. **Verifica que PostgreSQL esté corriendo**
3. **Verifica que el puerto 8000 no esté siendo usado por otro proceso**
4. **Ejecuta el script de diagnóstico**: `python test_backend.py`
5. **Comparte los logs del backend** para más ayuda

