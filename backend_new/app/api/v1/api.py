from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, initiatives, documentos_iniciativa, projects, project_students, milestones, criteria, evaluations, comments, messages, notifications, audits, roles, postulaciones

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(initiatives.router, prefix="/iniciativas", tags=["initiatives"])
api_router.include_router(documentos_iniciativa.router, prefix="/documentos", tags=["documents"])
api_router.include_router(projects.router, prefix="/proyectos", tags=["projects"])
api_router.include_router(project_students.router, prefix="/proyectos-estudiantes", tags=["project-students"])
api_router.include_router(milestones.router, prefix="/hitos", tags=["milestones"])
api_router.include_router(criteria.router, prefix="/criterios", tags=["criteria"])
api_router.include_router(evaluations.router, prefix="/evaluaciones", tags=["evaluations"])
api_router.include_router(comments.router, prefix="/comentarios", tags=["comments"])
api_router.include_router(messages.router, prefix="/mensajes", tags=["messages"])
api_router.include_router(notifications.router, prefix="/notificaciones", tags=["notifications"])
api_router.include_router(audits.router, prefix="/auditoria", tags=["audits"])
api_router.include_router(roles.router, prefix="", tags=["roles"])
api_router.include_router(postulaciones.router, prefix="/postulaciones", tags=["postulaciones"])
