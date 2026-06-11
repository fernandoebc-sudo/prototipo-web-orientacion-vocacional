from pydantic import BaseModel, Field


class CreateAdminRequest(BaseModel):
    username: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=8, max_length=128)


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class StudentLoginRequest(BaseModel):
    code: str


class TokenResponse(BaseModel):
    status: str
    access_token: str
    token_type: str
    role: str
    message: str


class StudentAccessCodeItem(BaseModel):
    id: int
    code: str
    is_active: bool
    is_used: bool
    created_at: str
    used_at: str | None


class StudentAccessCodesResponse(BaseModel):
    status: str
    message: str
    codes: list[StudentAccessCodeItem]