# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.role import Role  # noqa
from app.models.initiative import Initiative  # noqa
from app.models.postulacion import Postulacion  # noqa
from app.models.project import Project  # noqa
from app.models.project_student import ProjectStudent  # noqa
from app.models.milestone import Milestone  # noqa
from app.models.delivery import Delivery  # noqa
from app.models.criterion import Criterion  # noqa
from app.models.evaluation import Evaluation  # noqa
from app.models.comment import Comment  # noqa
from app.models.documento_iniciativa import DocumentoIniciativa  # noqa
from app.models.message import Message  # noqa
from app.models.notification import Notification  # noqa
from app.models.audit import Audit  # noqa
from app.models.token import Token  # noqa
