FROM python:3.10-slim-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential

# Crear el directorio static/uploads
RUN mkdir -p static/uploads

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]