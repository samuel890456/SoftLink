# Resumen de Roles, Permisos y Funcionalidades - SoftLink

## 📋 Roles del Sistema

### 1. Coordinador (id_rol = 1)
- **Acceso al Panel**: ✅ SÍ
- **Crear Iniciativas**: ✅ SÍ (cualquier usuario autenticado puede)
- **Crear Proyectos**: ✅ SÍ (solo coordinadores)
- **Asignar Estudiantes a Proyectos**: ✅ SÍ
- **Evaluar Estudiantes**: ✅ SÍ
- **Aprobar/Rechazar Iniciativas**: ✅ SÍ
- **Ver todos los proyectos**: ✅ SÍ

### 2. Estudiante (id_rol = 2)
- **Acceso al Panel**: ❌ NO
- **Crear Iniciativas**: ✅ SÍ (cualquier usuario autenticado puede)
- **Crear Proyectos**: ❌ NO
- **Postularse a Iniciativas**: ✅ SÍ (desde página de detalle de iniciativa)
- **Subir Hoja de Vida**: ✅ SÍ (desde su perfil)
- **Ver sus proyectos asignados**: ✅ SÍ
- **Ver evaluaciones**: ✅ SÍ

### 3. Empresa (id_rol = 3)
- **Acceso al Panel**: ✅ SÍ (compartido con coordinadores)
- **Crear Iniciativas**: ✅ SÍ (en página de Iniciativas)
- **Crear Proyectos**: ❌ NO
- **Ver iniciativas creadas**: ✅ SÍ
- **Evaluar resultados de proyectos**: ✅ SÍ
- **Contactar coordinadores/estudiantes**: ✅ SÍ

## 🔐 Permisos de Acceso

### Panel de Administración (`/panel`)
- **Acceso**: Solo Coordinadores (1) y Admins (3)
- **Protegido por**: `ProtectedRoute` con `requiredRoles={[1, 3]}`

### Perfil (`/perfil`)
- **Acceso**: Todos los usuarios autenticados (1, 2, 3)
- **Protegido por**: `ProtectedRoute` (sin restricción de roles)

## 📍 Dónde se Realizan las Acciones

### 🏢 Crear Iniciativas
- **Dónde**: Página `/iniciativas`
- **Quién puede**: Cualquier usuario autenticado (incluyendo empresas y estudiantes)
- **Cómo**: 
  1. Ir a la página de Iniciativas
  2. Si estás autenticado, verás el botón "Nueva Iniciativa"
  3. Completar el formulario con:
     - Nombre
     - Descripción
     - Categoría (social, empresarial, educativo, otro)
     - Impacto esperado
     - Documentos adjuntos (opcional)
  4. Enviar el formulario

### 🚀 Crear Proyectos
- **Dónde**: Página `/proyectos` (solo coordinadores)
- **Quién puede**: Solo Coordinadores (id_rol = 1)
- **Cómo**: 
  1. Coordinador va a la página de Proyectos
  2. Ve el botón "Nuevo Proyecto" (solo visible para coordinadores)
  3. Completa el formulario de creación de proyecto
  4. El proyecto se crea y puede asignar estudiantes

### 📝 Postularse a Iniciativas
- **Dónde**: Página de detalle de iniciativa (`/iniciativas/:id`)
- **Quién puede**: Estudiantes (id_rol = 2)
- **Cómo**:
  1. Estudiante navega a una iniciativa específica
  2. Ve el botón "Postularme a esta Iniciativa"
  3. Al hacer clic, se envía una solicitud/notificación al coordinador
  4. El coordinador puede revisar y asignar al estudiante a un proyecto

### 📄 Subir Hoja de Vida
- **Dónde**: Página de Perfil (`/perfil`)
- **Quién puede**: Estudiantes (id_rol = 2)
- **Cómo**:
  1. Estudiante va a su perfil
  2. En la sección "Datos Académicos", encuentra "Hoja de Vida"
  3. Hace clic en "Editar Perfil"
  4. Puede subir un archivo PDF, DOC o DOCX
  5. Guarda los cambios
  6. La hoja de vida queda disponible para coordinadores y empresas

## 🔗 Conexiones Frontend-Backend

### Endpoints Principales

#### Iniciativas
- `GET /api/v1/iniciativas/` - Listar iniciativas
- `POST /api/v1/iniciativas/` - Crear iniciativa (cualquier usuario autenticado)
- `GET /api/v1/iniciativas/{id}/` - Obtener iniciativa por ID

#### Proyectos
- `GET /api/v1/proyectos/` - Listar proyectos
- `POST /api/v1/proyectos/` - Crear proyecto (solo coordinadores)
- `GET /api/v1/proyectos/{id}/` - Obtener proyecto por ID

#### Usuarios
- `GET /api/v1/users/` - Listar usuarios
- `GET /api/v1/users/{id}` - Obtener usuario por ID
- `PUT /api/v1/users/{id}` - Actualizar usuario (incluye subida de foto y hoja de vida)

#### Proyectos-Estudiantes
- `GET /api/v1/proyectos-estudiantes/student/{student_id}` - Proyectos de un estudiante
- `POST /api/v1/proyectos-estudiantes/` - Asignar estudiante a proyecto (solo coordinadores)

## ✅ Correcciones Realizadas

1. **Botones Invisibles**: ✅ Corregidos usando componente `Button` en Navbar y Contacto
2. **Roles del Panel**: ✅ Corregido para que solo roles 1 y 3 accedan
3. **Creación de Iniciativas**: ✅ Permite a cualquier usuario autenticado (empresas y estudiantes)
4. **Subida de Hoja de Vida**: ✅ Implementada en el perfil del estudiante
5. **Campo hoja_vida**: ✅ Agregado al modelo User, schema y endpoint

## 📝 Notas Importantes

- El sistema NO tiene un endpoint específico para "postulaciones" a iniciativas
- La postulación se maneja a través de:
  - Mensajes entre estudiante y coordinador, O
  - El coordinador asigna directamente estudiantes a proyectos creados desde iniciativas
- Las empresas (rol 3) tienen acceso al Panel junto con coordinadores
- Los estudiantes pueden crear iniciativas, pero no proyectos
- Solo coordinadores pueden crear proyectos y asignar estudiantes

## 🚀 Próximos Pasos Sugeridos

1. Implementar endpoint específico para postulaciones a iniciativas
2. Agregar notificaciones cuando un estudiante se postula
3. Agregar funcionalidad para que coordinadores conviertan iniciativas en proyectos directamente
4. Implementar sistema de búsqueda y filtros avanzados
5. Agregar gráficos interactivos en el Panel

