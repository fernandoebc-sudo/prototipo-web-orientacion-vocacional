from pydantic import BaseModel, EmailStr, Field


class CreateAdminRequest(BaseModel):
    username: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=8, max_length=128)


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class StudentLoginRequest(BaseModel):
    email: EmailStr
    code: str
    recaptcha_token: str


class CreateStudentAccessCodeRequest(BaseModel):
    email: str = Field(min_length=5, max_length=120)


class CreateStudentAccessCodesBulkRequest(BaseModel):
    emails: list[str] = Field(min_length=1, max_length=20)


class TokenResponse(BaseModel):
    status: str
    access_token: str
    token_type: str
    role: str
    message: str


class StudentAccessCodeItem(BaseModel):
    id: int
    code: str
    has_email: bool
    is_active: bool
    is_used: bool
    created_at: str
    used_at: str | None
    sent_at: str | None


class StudentAccessCodesResponse(BaseModel):
    status: str
    message: str
    codes: list[StudentAccessCodeItem]


class StudentAccessCodesBulkResponse(BaseModel):
    status: str
    message: str
    created: int
    skipped: int
    failed: int
    details: list[str]
    codes: list[StudentAccessCodeItem]