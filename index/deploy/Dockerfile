FROM python:3.11-slim-buster

WORKDIR /app

COPY ./ ./
COPY .env.prod .env

RUN pip install -r requirements.txt
RUN python -m nltk.downloader -d /tmp/llama_index punkt

EXPOSE 8068

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8068"]