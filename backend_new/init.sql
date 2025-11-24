

-- =====================================================
-- TABLA: roles
-- =====================================================
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

-- Datos iniciales
INSERT INTO roles (nombre, descripcion) VALUES
('coordinador', 'Supervisa proyectos, aprueba iniciativas y evalúa estudiantes'),
('estudiante', 'Participa en proyectos y desarrolla soluciones tecnológicas'),
('empresa', 'Registra iniciativas y evalúa resultados');

-- =====================================================
-- TABLA: usuarios
-- =====================================================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    github VARCHAR(255),
    tecnologias TEXT,
    foto VARCHAR(255), -- ruta o URL a la imagen
    hoja_vida VARCHAR(255), -- ruta o URL a la hoja de vida (CV)
    bio TEXT, -- Nuevo campo para descripción general
    sitio_web VARCHAR(255), -- Nuevo campo para sitio web de empresa/portafolio
    direccion VARCHAR(255), -- Nuevo campo para dirección de empresa
    identificador_fiscal VARCHAR(50), -- Nuevo campo para DNI/identificador fiscal de empresa
    id_rol INT REFERENCES roles(id_rol) ON DELETE SET NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: tokens
-- =====================================================
CREATE TABLE tokens (
    id_token SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    token TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'auth', -- auth | recovery
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP
);

-- =====================================================
-- TABLA: iniciativas
-- =====================================================
CREATE TABLE iniciativas (
    id_iniciativa SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50),
    impacto TEXT,
    estado VARCHAR(30) DEFAULT 'pendiente',
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: documentos_iniciativa
-- =====================================================
CREATE TABLE documentos_iniciativa (
    id_doc SERIAL PRIMARY KEY,
    id_iniciativa INT REFERENCES iniciativas(id_iniciativa) ON DELETE CASCADE,
    nombre_archivo VARCHAR(255),
    ruta_archivo VARCHAR(255),
    tipo VARCHAR(50)
);

-- =====================================================
-- TABLA: proyectos
-- =====================================================
CREATE TABLE proyectos (
    id_proyecto SERIAL PRIMARY KEY,
    id_iniciativa INT UNIQUE REFERENCES iniciativas(id_iniciativa) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(30) DEFAULT 'activo',
    fecha_inicio DATE,
    fecha_fin DATE,
    progreso INT DEFAULT 0,
    id_coordinador INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- =====================================================
-- TABLA: proyectos_estudiantes (relación N:N)
-- =====================================================
CREATE TABLE proyectos_estudiantes (
    id_proyecto INT REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
    id_estudiante INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    rol_en_proyecto VARCHAR(50),
    PRIMARY KEY (id_proyecto, id_estudiante)
);

-- =====================================================
-- TABLA: hitos
-- =====================================================
CREATE TABLE hitos (
    id_hito SERIAL PRIMARY KEY,
    id_proyecto INT REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
    titulo VARCHAR(150),
    descripcion TEXT,
    fecha_entrega DATE,
    estado VARCHAR(30) DEFAULT 'pendiente'
);

-- =====================================================
-- TABLA: criterios
-- =====================================================
CREATE TABLE criterios (
    id_criterio SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    peso NUMERIC(4,2) CHECK (peso >= 0)
);

-- =====================================================
-- TABLA: evaluaciones
-- =====================================================
CREATE TABLE evaluaciones (
    id_eval SERIAL PRIMARY KEY,
    id_proyecto INT REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
    id_evaluador INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    id_criterio INT REFERENCES criterios(id_criterio) ON DELETE SET NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 0 AND 100),
    observaciones TEXT
);

-- =====================================================
-- TABLA: comentarios
-- =====================================================
CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_proyecto INT REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: mensajes (opcional)
-- =====================================================
CREATE TABLE mensajes (
    id_mensaje SERIAL PRIMARY KEY,
    id_remitente INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    id_destinatario INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    asunto VARCHAR(150),
    contenido TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- TABLA: notificaciones (opcional)
-- =====================================================
CREATE TABLE notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(150),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- TABLA: auditoria / logs (opcional)
-- =====================================================
CREATE TABLE auditoria (
    id_log SERIAL PRIMARY KEY,
    tabla_afectada VARCHAR(50),
    accion VARCHAR(50),
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalles TEXT
);

-- =====================================================
-- TABLA: postulaciones
-- =====================================================
CREATE TABLE postulaciones (
    id_postulacion SERIAL PRIMARY KEY,
    id_iniciativa INT REFERENCES iniciativas(id_iniciativa) ON DELETE CASCADE,
    id_estudiante INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_postulacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'pendiente', -- pendiente | aceptada | rechazada
    mensaje TEXT, -- Mensaje opcional del estudiante al postularse
    UNIQUE(id_iniciativa, id_estudiante) -- Evitar duplicados
);

-- =====================================================
-- VISTA: Proyectos con detalle
-- =====================================================
CREATE VIEW vista_proyectos_detalle AS
SELECT 
    p.id_proyecto,
    p.titulo,
    p.estado,
    p.fecha_inicio,
    p.progreso,
    i.nombre AS iniciativa,
    u.nombre AS coordinador
FROM proyectos p
JOIN iniciativas i ON p.id_iniciativa = i.id_iniciativa
LEFT JOIN usuarios u ON p.id_coordinador = u.id_usuario;
