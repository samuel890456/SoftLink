# 🎨 Sistema de Diseño - PlataformaPI

## ⚙️ Tokens de Diseño

### Paleta de Colores

```css
/* Colores Primarios */
--primary: #4F46E5 (Índigo institucional)
--accent: #10B981 (Verde éxito)
--background: #F9FAFB (Fondo claro)
--surface: #FFFFFF (Superficie)
--text-primary: #0F172A (Texto principal)
--text-secondary: #6B7280 (Texto secundario)

/* Utilización Tailwind */
bg-indigo-600     /* Primary */
bg-green-500      /* Accent */
bg-[#F9FAFB]      /* Background */
bg-white          /* Surface */
text-[#0F172A]    /* Text Primary */
text-[#6B7280]    /* Text Secondary */
```

### Tipografía

```css
/* Fuentes */
font-poppins: 'Poppins', sans-serif  /* Encabezados */
font-inter: 'Inter', sans-serif       /* Cuerpo y UI */

/* Escalas Desktop */
H1: 40px (800 weight)  /* font-poppins font-black text-[40px] */
H2: 28px (600 weight)  /* font-poppins font-semibold text-[28px] */
Cuerpo: 16px (400)     /* font-inter text-[16px] */
```

### Espaciado

```css
/* Sistema de 4px */
space-1: 4px
space-2: 8px
space-4: 16px
space-6: 24px
space-8: 32px
```

### Sombras y Bordes

```css
/* Bordes redondeados */
rounded-2xl: 16px

/* Sombra principal */
shadow-[0_8px_24px_rgba(15,23,42,0.06)]

/* Sombra hover */
hover:shadow-xl
```

### Animaciones

```javascript
// Configuración Framer Motion
transition={{
  duration: 0.32,
  ease: [0.22, 0.9, 0.3, 1]  // cubic-bezier(.22,.9,.3,1)
}}

// Animación de entrada
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}

// Hover effect
whileHover={{ y: -4, scale: 1.02 }}
```

---

## 🧩 Componentes Implementados

### 1. ProgressBar
**Ubicación:** `Frontend/src/components/ProgressBar.jsx`

**Props:**
- `progress` (number, 0-100): Valor de progreso
- `className` (string): Clases adicionales
- `showLabel` (boolean): Mostrar etiquetas

**Uso:**
```jsx
<ProgressBar progress={75} showLabel={true} />
```

**Características:**
- Barra de 3px altura
- Animación con Framer Motion
- Degradado `from-indigo-500 to-indigo-300`
- Duración: 0.8s con easing personalizado

---

### 2. ProjectCard
**Ubicación:** `Frontend/src/components/ProjectCard.jsx`

**Props:**
- `project` (object): Datos del proyecto
  - `id`, `title`, `description`, `category`, `status`, `progress`, `students`, `icon`

**Uso:**
```jsx
<ProjectCard project={projectData} />
```

**Características:**
- Badges de estado con colores semánticos
- ProgressBar integrado
- Hover effect (elevación y escala)
- Icono y categoría
- Información de estudiantes

---

### 3. ProfileCard (Estudiante)
**Ubicación:** `Frontend/src/components/ProfileCard.jsx`

**Props:**
- `student` (object): Datos del estudiante
  - `name`, `tech`, `avatar`, `github`, `linkedin`, `email`, `projects`

**Uso:**
```jsx
<ProfileCard student={studentData} />
```

**Características:**
- Avatar circular de 96px
- Tech stack con chips
- Enlaces a redes sociales
- Animación staggered para chips

---

### 4. DashboardMetricCard
**Ubicación:** `Frontend/src/components/DashboardMetricCard.jsx`

**Props:**
- `metric` (object): Datos de la métrica
  - `title`, `value`, `change`, `trend`, `icon`

**Uso:**
```jsx
<DashboardMetricCard metric={metricData} />
```

**Características:**
- Número grande (40px)
- Trend indicator (up/down)
- Sparkline gráfico sutil
- Icono con gradiente

---

## 🗺️ Layout Global

### Header (Navbar)
- **Sticky:** `sticky top-0`
- **Blur:** `backdrop-blur-md`
- **Sombra:** `shadow-[0_4px_6px_rgba(15,23,42,0.08)]`
- **Max width:** 1280px, centrado
- **Padding:** `px-4 py-4`

### Contenedor de Página
```jsx
<div className="container mx-auto px-4 max-w-1280px">
  {/* Contenido */}
</div>
```

### Footer
- **Fondo:** `bg-gray-900`
- **Texto:** Blanco con opacidad
- **Columnas:** 4 columnas responsivas

---

## 📐 Página: PlataformaPI.jsx

**Ubicación:** `Frontend/src/pages/PlataformaPI.jsx`

### Estructura:

1. **Hero Section (560px alto)**
   - Diseño 2 columnas
   - H1 con animación fade-up
   - CTAs (Primario y Secundario)
   - Mockup/Ilustración derecha

2. **Convocatorias (Grid 3 columnas)**
   - Utiliza `ProjectCard`
   - Sombras y hover effects

3. **Dashboard Preview**
   - Grid 3 métricas con `DashboardMetricCard`
   - Tabla de gestión con acciones

4. **Directorio de Estudiantes**
   - Grid 3 `ProfileCard`
   - Masonry layout

---

## 🎯 Mejores Prácticas

### Animaciones
```jsx
// Siempre usar Framer Motion con estas configuraciones
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 0.9, 0.3, 1]
    }
  }
};
```

### Colores
- Usar valores hex del sistema de diseño
- Evitar colores hardcodeados en el código
- Mantener contraste AA (4.5:1 mínimo)

### Espaciado
- Usar el sistema de 4px consistentemente
- Padding y margin alineados a la escala

### Accesibilidad
- Todo elemento interactivo con `aria-label`
- Navegación por teclado funcional
- Contraste adecuado en todos los textos
- Focus visible en todos los elementos

---

## 🚀 Uso Completo

```jsx
import ProjectCard from '../components/ProjectCard';
import ProfileCard from '../components/ProfileCard';
import DashboardMetricCard from '../components/DashboardMetricCard';
import ProgressBar from '../components/ProgressBar';

function MyPage() {
  return (
    <div className="bg-[#F9FAFB]">
      {/* Usar componentes con datos */}
      <ProjectCard project={projectData} />
      <ProfileCard student={studentData} />
      <DashboardMetricCard metric={metricData} />
      <ProgressBar progress={75} />
    </div>
  );
}
```

---

## 📊 Resultado Final

✅ Diseño moderno tipo SaaS (Notion, Linear, Coursera)
✅ Animaciones suaves y naturales
✅ Componentes reutilizables
✅ Sistema de tokens consistente
✅ Accesibilidad WCAG 2.1 AA
✅ Responsive design completo
✅ Listo para implementación en producción

