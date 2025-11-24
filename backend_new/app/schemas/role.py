from pydantic import BaseModel, ConfigDict

class RoleBase(BaseModel):
    nombre: str
    descripcion: str | None = None

class RoleCreate(RoleBase):
    pass

class RoleUpdate(RoleBase):
    nombre: str | None = None

class Role(RoleBase):
    id_rol: int

    model_config = ConfigDict(from_attributes=True)