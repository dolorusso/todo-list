# TO-DO List

## Descripción

Este proyecto es una aplicación de lista de tareas (To-Do List) que permite realizar un **CRUD** (Crear, Leer, Actualizar, Eliminar) de tareas.

## Tecnologías utilizadas

- **PostgreSQL** para la base de datos.
- **Prisma** como ORM para interactuar con PostgreSQL.
- **Next.js** como framework para construir la aplicación web.
- **TypeScript** para mejorar la experiencia de desarrollo con tipado estático.
- **Tailwind CSS** para un diseño responsivo y moderno.

## Instalación

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local utilizando Git:

```bash
  git clone https://github.com/tu-usuario/todo-app.git
```

### 2. Instalar dependencias
```bash
  cd todo-app
  npm install
  # o si usas yarn
  yarn install
```

### 3. 
Este proyecto utiliza PostgreSQL como base de datos. Para configurarla en tu máquina local, sigue estos pasos:

- Instalar PostgreSQL

- Crear una base de datos: Crea una base de datos con el nombre que prefieras (por ejemplo, todo-app).

- Configurar las credenciales en el archivo .env: En el archivo .env, agrega las credenciales de tu base de datos. Si aún no tienes un archivo .env, crea uno en la raíz del proyecto y agrega lo siguiente:
  ```bash
      DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_de_base_de_datos"
  ```
Reemplaza usuario, contraseña y nombre_de_base_de_datos con tus propias credenciales.

