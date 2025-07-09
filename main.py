from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from transformers import pipeline

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Load the Hugging Face model
qa_pipeline = pipeline("text-generation", model="gpt2")  # You can replace with another

@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/", response_class=HTMLResponse)
async def get_answer(request: Request, user_input: str = Form(...)):
    result = qa_pipeline(user_input, max_length=100, num_return_sequences=1)
    answer = result[0]['generated_text']
    return templates.TemplateResponse("index.html", {"request": request, "answer": answer, "user_input": user_input})
