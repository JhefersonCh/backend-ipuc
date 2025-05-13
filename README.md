# 🔧 Backend - IPUC Sede Cuarta Mocoa Putumayo (En desarrollo)

Este es el backend de la página web de la **Iglesia Pentecostal Unida de Colombia - Sede Cuarta de Mocoa, Putumayo**. Gestiona toda la lógica del servidor, autenticación, base de datos y funcionalidades administrativas del sitio.

## ⚙️ Tecnologías utilizadas

- 🚀 **[NestJS](https://nestjs.com/)**: Framework progresivo para construir aplicaciones backend eficientes y escalables con TypeScript.
- 📨 **[Nodemailer](https://nodemailer.com/)**: Utilizado para el envío de correos electrónicos (verificación, notificaciones, etc).
- 🧱 **[TypeORM](https://typeorm.io/)**: ORM para manejar las entidades y relaciones en la base de datos de manera sencilla.
- 🐘 **[PostgreSQL](https://www.postgresql.org/)**: Base de datos relacional potente y confiable.

## 🔐 Funcionalidades principales

- Autenticación con JWT (registro, login, recuperación)
- Encriptación de contraseñas al registrarse
- Gestión de usuarios y roles
- Panel administrativo protegido
- Foro de preguntas y comentarios
- Envío de correos automáticos (confirmación, recuperación, etc)
- CRUD completo para publicaciones, perfiles, foros, etc.
