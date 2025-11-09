# SoftLink Frontend

Este proyecto es la interfaz de usuario (frontend) para la plataforma SoftLink, construida con React, Vite y Tailwind CSS. Permite a los usuarios interactuar con iniciativas, proyectos, perfiles de estudiantes y funcionalidades de administración.

## Características Principales

-   **Autenticación:** Registro, inicio de sesión y recuperación de contraseña.
-   **Gestión de Iniciativas:** Exploración, creación (para roles autorizados) y visualización de detalles.
-   **Directorio de Estudiantes:** Listado, filtrado y perfiles detallados.
-   **Gestión de Proyectos:** Exploración y visualización de detalles.
-   **Modalidad Freelancer:** Página informativa.
-   **Panel de Administración:** Métricas y gestión de iniciativas pendientes (para roles autorizados).
-   **Perfil de Usuario:** Visualización y edición de datos personales.
-   **Contacto:** Formulario de envío de mensajes.

## Tecnologías Utilizadas

-   **React:** Biblioteca para construir interfaces de usuario.
-   **Vite:** Herramienta de construcción rápida para proyectos web.
-   **Tailwind CSS:** Framework CSS de primera utilidad para un diseño rápido y responsivo.
-   **Framer Motion:** Para animaciones fluidas.
-   **React Router DOM:** Para la navegación entre páginas.
-   **Axios:** Cliente HTTP para realizar peticiones a la API.
-   **Zustand / React Context:** Para la gestión de estado global (autenticación).
-   **React Hook Form & Yup:** Para la gestión y validación de formularios.
-   **Lucide React:** Iconos.
-   **Recharts:** Para la visualización de gráficos en el dashboard.

## Configuración del Entorno

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_API_URL=http://localhost:8000/api
```

-   `VITE_API_URL`: La URL base de tu API backend. Asegúrate de que apunte a la dirección correcta donde tu backend esté corriendo.

### 2. Instalación de Dependencias

Asegúrate de tener Node.js (versión 18 o superior) y npm instalados.

```bash
npm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo, generalmente accesible en `http://localhost:5173`.

### 4. Construir para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

### 5. Previsualizar la Construcción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

## Cómo Probar el Login

1.  Asegúrate de que tu backend esté corriendo y accesible en la `VITE_API_URL` configurada.
2.  Navega a la página de registro (`/register`) y crea una nueva cuenta.
3.  Una vez registrado, ve a la página de inicio de sesión (`/login`).
4.  Ingresa las credenciales de la cuenta que acabas de crear.
5.  Al iniciar sesión con éxito, serás redirigido al panel de administración (`/panel`) o a la página de inicio, dependiendo de tu rol.

## Endpoints de la API

La aplicación interactúa con los siguientes endpoints del backend:

-   `POST /api/auth/login`: Inicio de sesión de usuario.
-   `POST /api/auth/register`: Registro de nuevo usuario.
-   `POST /api/auth/forgot-password`: Solicitud de recuperación de contraseña.
-   `GET /api/iniciativas`: Obtener listado de iniciativas (con paginación y filtros).
-   `POST /api/iniciativas`: Crear una nueva iniciativa (soporta `multipart/form-data` para archivos).
-   `GET /api/iniciativas/:id`: Obtener detalles de una iniciativa específica.
-   `GET /api/proyectos`: Obtener listado de proyectos (con paginación y filtros).
-   `GET /api/proyectos/:id`: Obtener detalles de un proyecto específico.
-   `GET /api/usuarios`: Obtener listado de usuarios/estudiantes (con paginación y filtros).
-   `GET /api/usuarios/:id`: Obtener detalles de un usuario específico.
-   `PUT /api/usuarios/:id`: Actualizar perfil de usuario.
-   `POST /api/contact`: Enviar mensaje de contacto.

## Roles de Usuario

La aplicación maneja los siguientes roles de usuario (asumiendo los siguientes `id_rol` del backend):

-   **1:** Coordinador
-   **2:** Estudiante
-   **3:** Empresa
-   **4:** Administrador

La visibilidad de ciertas funcionalidades y rutas está controlada por estos roles.

## Tests Básicos

(Pendiente de implementación - se añadirán tests unitarios y de integración para flujos clave como login, creación de iniciativas y renderizado de métricas del dashboard.)

## Diseño

(Opcional: Aquí se pueden añadir enlaces a Figma, capturas de pantalla o guías de estilo si existen.)