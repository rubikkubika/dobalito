# Docker Organization Rules

## 📁 File Placement Rules

### ✅ CORRECT - Place in `docker/` directory:
- `docker/docker-compose.yml` - Main compose file
- `docker/docker-compose.dev.yml` - Development compose
- `docker/docker-compose.prod.yml` - Production compose
- `docker/Dockerfile.frontend` - Frontend Dockerfile
- `docker/Dockerfile.backend` - Backend Dockerfile
- `docker/Dockerfile.fullstack` - Full-stack Dockerfile
- `docker/nginx.conf` - Nginx configuration
- `docker/entrypoint.sh` - Docker entrypoint scripts

### ❌ INCORRECT - Don't place in root:
- `docker-compose.yml` (should be in `docker/`)
- `Dockerfile` (should be in `docker/`)
- `nginx.conf` (should be in `docker/`)

## 🔧 Build Context Rules

When referencing Docker files from `docker/` directory:
- Use `docker/` as the build context
- Reference files with relative paths from `docker/`
- Example: `dockerfile: docker/Dockerfile.frontend`

## 📝 Naming Conventions

- Docker Compose files: `docker-compose.yml`, `docker-compose.*.yml`
- Dockerfiles: `Dockerfile`, `Dockerfile.*`
- Configuration files: descriptive names (`nginx.conf`, `postgres.conf`)

## 🚀 Usage Examples

### Local Development:
```bash
cd docker
docker-compose up -d
```

### Railway Deployment:
```toml
[build]
dockerfilePath = "docker/Dockerfile.fullstack"
buildContext = "docker"
```

## ⚠️ Important Notes

- Always maintain consistency with existing Docker file organization
- Update build contexts when moving files to `docker/` directory
- Keep Docker-related documentation in `docker/README.md`
