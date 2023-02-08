FROM python:3.8

WORKDIR /app

COPY . .

RUN pip install -U pip wheel cmake
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python3", "./app.py"]