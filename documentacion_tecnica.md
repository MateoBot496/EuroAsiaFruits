# Documentación técnica — EuroAsia Fruits

## 1. Visión general

Aplicación web para la empresa EuroAsia Fruits Imp Exp, S.L., orientada a la presentación de su catálogo de frutas, verduras y setas de importación. Consta de una parte pública (catálogo, contacto, información de empresa) y un panel de administración protegido para la gestión de productos y usuarios.

---

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript, Vite, Tailwind CSS v4, React Router v6 |
| Backend | Node.js + Express |
| Base de datos | MySQL (mysql2/promise) |
| Autenticación | JWT (access token + refresh token) + bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Tipografías | Baloo 2 (variable), Commerce Regular |

---

## 3. Arquitectura general

```
Cliente (React SPA)
        ↕ HTTP / REST
Servidor Express (Node.js)
        ↕ mysql2/promise (2 pools)
Base de datos MySQL (EUROASIA)
```

El servidor expone dos familias de endpoints claramente separadas:
- `/api/public/*` — acceso libre, usuario MySQL de solo lectura
- `/api/admin/*` — protegidas por JWT, usuario MySQL con permisos completos
- `/api/auth/*` — gestión de sesión (login, logout, refresh, me)

Las imágenes de productos se sirven como archivos estáticos desde `/images` en el propio servidor Express.

---

## 4. Base de datos

**Base de datos:** `EUROASIA` (utf8mb4, unicode_ci)

### Entidades principales

**Catálogo de productos**

- `productos` — entidad central. Campos clave: `referencia` (único), `nombre`, `nombre_ingles`, `descripcion`, `url_imagen`, `disponible` (boolean), `destacado` (boolean), `fecha_creacion`, `fecha_modificacion`.
- `grupos` — clasificación de primer nivel (fruta, verdura, seta, otros).
- `categorias` — clasificación de segundo nivel (aromático, cítrico, tubérculo, etc.).
- `origenes` — procedencia geográfica del producto.
- `etiquetas` — tags libres (ej. "asiatico", "importado_aereo"). Relación N:M con productos a través de `productos_etiquetas`.
- `envases` — tipos de envase disponibles. Relación N:M con productos a través de `productos_envases`.

Todos los catálogos (grupos, categorías, orígenes, etiquetas, envases) tienen el campo `is_active` para activar/desactivar entradas sin borrarlas.

**Administración**

- `admin_users` — usuarios del panel admin. Roles: `0 = ADMIN`, `1 = SUPERADMIN`. Incluye control de intentos fallidos (`failed_attempts`, `locked_until`) y registro de auditoría (`created_by`, `last_login_at`). El email se normaliza automáticamente a minúsculas mediante triggers.
- `admin_refresh_tokens` — almacena el hash SHA-256 del refresh token (nunca el token en claro), con campos de expiración (`expires_at`), revocación (`revoked_at`), y metadatos de sesión (`user_agent`, `ip_address`). Un admin puede tener tokens en múltiples dispositivos.

### Usuarios MySQL

El servidor utiliza dos cuentas MySQL con permisos distintos:

- `euroasia_public` — solo `SELECT` sobre las tablas de catálogo. No tiene acceso a `admin_users` ni `admin_refresh_tokens`.
- `euroasia_admin` — `SELECT`, `INSERT`, `UPDATE`, `DELETE` sobre toda la base de datos.

---

## 5. Backend

### Estructura de carpetas

```
src/
├── app.js                  # Configuración Express, middlewares, rutas
├── server.js               # Arranque del servidor
├── config/
│   └── db.js               # Dos pools MySQL: publicPool y adminPool
├── controllers/
│   ├── auth/
│   ├── public/
│   └── admin/
├── routes/
│   ├── auth/
│   ├── public/
│   └── admin/
├── services/               # Lógica de negocio y acceso a BBDD
├── middlewares/
│   ├── auth.js             # Verificación JWT y control de roles
│   └── errorHandler.js     # Manejador global de errores
└── utils/
    └── responses.js
```

### Patrón de capas

El backend sigue una arquitectura de tres capas: **rutas → controladores → servicios**. Los controladores no contienen lógica SQL; delegan en los servicios. Los servicios acceden directamente a la base de datos mediante los pools de conexión.

### Middlewares

**`auth.js`** — verifica el `accessToken` recibido en cookie `httpOnly`. Acepta un array de roles permitidos: `auth([0,1])` para admin y superadmin, `auth([1])` para solo superadmin. Devuelve 401 si no hay token o está expirado, 403 si el rol no está autorizado.

**`errorHandler.js`** — captura todos los errores no manejados. Usa `err.statusCode` si está definido, o 500 por defecto.

### Autenticación

Sistema de doble token con cookies `httpOnly`:

- **Access token** — JWT firmado con `JWT_SECRET`, duración 10 minutos. Se envía en cada petición protegida vía cookie.
- **Refresh token** — JWT firmado con `JWT_REFRESH_SECRET`, duración 14 días. Su hash SHA-256 se almacena en `admin_refresh_tokens`. Al caducar el access token, el cliente llama a `POST /api/auth/refresh` para obtener uno nuevo sin volver a hacer login.
- **Logout real** — revoca el refresh token en base de datos (campo `revoked_at`), además de limpiar las cookies.
- **Protección frente a fuerza bruta** — los intentos fallidos de login se acumulan en `failed_attempts`. Si se supera el umbral, la cuenta queda bloqueada hasta `locked_until`.

### Endpoints principales

**Públicos**

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/public/productos` | Todos los productos. Acepta query params: `id_grupo`, `id_categoria`, `id_origen`, `envases`, `etiquetas` |
| GET | `/api/public/productos/buscar?search=` | Búsqueda por nombre, descripción, categoría, grupo, origen, etiqueta |
| GET | `/api/public/productos/:id` | Detalle de un producto |
| GET | `/api/public/productos-destacados` | Productos con `destacado = 1` |
| POST | `/api/public/contacto` | Envío de formulario de contacto (email vía Nodemailer) |
| GET | `/api/public/catalogos/:tipo` | Catálogos activos (grupos, categorías, orígenes, etc.) |

**Auth**

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Login. Devuelve cookies accessToken + refreshToken |
| POST | `/api/auth/logout` | Logout. Revoca refresh token y limpia cookies |
| GET | `/api/auth/me` | Devuelve datos del usuario autenticado |
| POST | `/api/auth/refresh` | Renueva el access token usando el refresh token |

**Admin (requieren JWT)**

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| GET | `/api/admin/productos` | 0, 1 | Listar todos los productos |
| POST | `/api/admin/productos` | 0, 1 | Crear producto |
| PUT | `/api/admin/productos/:id` | 0, 1 | Editar producto |
| PUT | `/api/admin/productos/:id/destacado` | 0, 1 | Marcar/desmarcar destacado |
| PUT | `/api/admin/productos/:id/disponible` | 0, 1 | Activar/desactivar disponibilidad |
| DELETE | `/api/admin/productos/:id` | 1 | Eliminar producto (solo superadmin) |
| GET/POST/PUT | `/api/admin/catalogos/:tipo` | 0, 1 | CRUD de catálogos |
| GET/POST/PUT | `/api/admin/users` | 0, 1 | Gestión de usuarios admin |
| POST | `/api/admin/images` | 0, 1 | Subida de imágenes de producto |

### Imágenes

Las imágenes se almacenan en el sistema de archivos del servidor bajo `public/images/`. El campo `url_imagen` en la base de datos guarda solo el nombre del archivo. Los controladores construyen la URL completa dinámicamente en función del protocolo y host de la petición (`req.protocol + req.get("host")`), lo que permite funcionar en local y en producción sin cambios.

### Email

El formulario de contacto utiliza Nodemailer con transporte Gmail. Las credenciales se configuran mediante variables de entorno (`SMTP_USER`, `SMTP_PASS`). El destinatario se define en `CONTACTO_TO` (o usa `SMTP_USER` si no está definido). El formulario puede enviarse con o sin datos de producto según el contexto (formulario general vs. consulta desde página de producto).

---

## 6. Frontend

### Estructura de carpetas

```
src/
├── App.tsx                 # Rutas, layout, providers
├── App.css                 # Variables CSS, fuentes, estilos globales
├── index.css               # Importa módulos CSS + Tailwind
├── main.tsx                # Punto de entrada React
├── assets/                 # Imágenes, vídeo, fuentes, flags
├── components/             # Componentes reutilizables
├── pages/                  # Páginas públicas y área admin
│   └── admin/
├── hooks/                  # Custom hooks de datos
├── context/                # AuthContext
├── interfaces/             # Tipos TypeScript
├── utils/                  # Utilidades (formatLabel)
└── styles/                 # Módulos CSS
    ├── navbar.css
    ├── footer.css
    ├── cards.css
    ├── filters.css
    └── pages/
        ├── home.css
        ├── about.css
        ├── productos.css
        └── contacto.css
```

### Arquitectura CSS

Los estilos siguen un sistema modular. `App.css` contiene las variables de color, declaración de fuentes y utilidades globales. `index.css` importa todos los módulos de `styles/` antes de la directiva `@import "tailwindcss"` — orden necesario para compatibilidad con Tailwind v4. Las páginas que usan exclusivamente Tailwind (detalle de producto, área admin) no tienen archivo CSS propio.

La paleta de colores se define mediante variables CSS:

```css
--color-crema, --color-rojo, --color-verde-azulado,
--color-rosado, --color-verde-oscuro, --color-crema-oscuro
```

### Páginas públicas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Hero vídeo, sección empresa, productos destacados |
| `/productos` | `Productos` | Catálogo completo con filtros por grupo, categoría, origen y etiqueta |
| `/producto/:id` | `Producto` | Detalle de producto con formulario de consulta |
| `/destacados` | `ProductosDestacados` | Selección de productos destacados |
| `/about` | `About` | Historia, misión, valores y sedes |
| `/contacto` | `Contacto` | Información de contacto, mapa y formulario |

### Filtrado de productos

El filtrado es completamente en cliente. El hook `useProductos` carga todos los productos al montar la página. Los filtros activos (grupo, categoría, origen, etiquetas) se aplican mediante `useMemo` sobre el array en memoria sin nuevas peticiones al servidor.

Los enlaces del footer a secciones de productos (`/productos?grupo=fruta`, `?grupo=verdura`, `?grupo=seta`) se leen con `useSearchParams` al montar el componente y se sincronizan con un `useEffect` para responder a cambios de URL sin desmontar el componente.

### Autenticación en el cliente

`AuthContext` gestiona el estado de sesión. Al cargar la app llama a `GET /api/auth/me` para verificar si hay sesión activa. Las rutas de admin están envueltas en `AdminRoute` y `LoginRoute` que redirigen según el estado de autenticación.

### Componentes destacados

- **`Navbar`** — menú hamburguesa en móvil (< 768px), links + searchbar en desktop.
- **`Searchbar`** — búsqueda en tiempo real contra `/api/public/productos/buscar`. Muestra resultados en dropdown con scroll.
- **`FormularioContacto`** — usado en dos contextos: modal desde la página de detalle de producto (con campos de producto visibles), y embebido en la página de Contacto (sin campos de producto, sin overlay).
- **`ScrollRestoration`** — hace scroll al top en cada cambio de ruta.
- **`ProductoCard`** — tarjeta de producto con prop `simple` para alternar entre vista compacta y completa.

### Custom hooks

| Hook | Función |
|---|---|
| `useProductos` | Carga todos los productos públicos |
| `useProductosDestacados` | Carga productos con `destacado = 1` |
| `useProductoPorId` | Carga el detalle de un producto por ID |
| `useSearchBar` | Búsqueda debounced de productos |
| `useCatalogos` / `useActiveCatalogos` | Catálogos de grupos, categorías, etc. |
| `useUsuarios` / `useUsuarioPorId` | Gestión de usuarios admin |

---

## 7. Variables de entorno

El servidor requiere un archivo `.env` con las siguientes variables:

```
DB_HOST
DB_PORT
DB_NAME
DB_PUBLIC_USER
DB_PUBLIC_PASSWORD
DB_ADMIN_USER
DB_ADMIN_PASSWORD
JWT_SECRET
JWT_REFRESH_SECRET
JWT_ACCESS_EXPIRES_IN     # ej. "10m"
JWT_REFRESH_EXPIRES_IN    # ej. "14d"
SMTP_USER
SMTP_PASS
CONTACTO_TO               # opcional
NODE_ENV                  # "development" | "production"
PORT                      # opcional, por defecto 3000
```

---

## 8. Arranque del proyecto en local

**Base de datos**
```bash
mysql -u root -p < EuroAsia_create.sql
mysql -u root -p EUROASIA < EuroAsia_insert.sql
```

**Backend**
```bash
cd server
npm install
# Crear .env con las variables indicadas en la sección 7
node server.js
# Servidor en http://localhost:3000
```

**Frontend**
```bash
cd cliente
npm install
npm run dev
# App en http://localhost:5173
```
