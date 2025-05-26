from fastapi import FastAPI, File, UploadFile
from sqlmodel import SQLModel, Field, create_engine, Session, select
from datetime import datetime
from PIL import Image
import pytesseract
import io
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

#SQLModel
class Document(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    filename: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    extracted_text: str
    user: str | None = None
    status: str = "completed"

#Initialize db
engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)

# OCR upload
@app.post("/upload-document-tesseract/")
async def upload_document_tesseract(file: UploadFile = File(...), user: str = "anonymous"):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    text = pytesseract.image_to_string(image)
    doc = Document(
        filename=file.filename,
        extracted_text=text,
        user=user,
        status="completed"
    )
    with Session(engine) as session:
        session.add(doc)
        session.commit()
        session.refresh(doc)
    return {
        "id": doc.id,
        "filename": doc.filename,
        "extracted_text": doc.extracted_text,
        "uploaded_at": doc.uploaded_at,
        "user": doc.user,
        "status": doc.status
    }

@app.get("/documents/")
def list_documents():
    with Session(engine) as session:
        docs = session.exec(select(Document)).all()
    return docs


@app.get("/documents/{doc_id}")
def get_document(doc_id: int):
    with Session(engine) as session:
        doc = session.get(Document, doc_id)
        if not doc:
            return {"error": "Document not found"}
    return doc

@app.get("/user-documents/{user}")
def list_user_documents(user: str):
    with Session(engine) as session:
        docs = session.exec(select(Document).where(Document.user == user)).all()
    return docs
