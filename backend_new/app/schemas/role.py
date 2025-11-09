from pydantic import BaseModel

class RoleBase(BaseModel):
    nombre: str
    descripcion: str | None = None

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    id_rol: int

    class Config:
        from_attributes = True