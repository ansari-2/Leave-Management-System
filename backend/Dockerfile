FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR Leave-Management-System-lms_current/backend

COPY requirements.txt /Leave-Management-System-lms_current/backend/

# Build psycopg2-binary from source -- add required required dependencies
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
        pip install --no-cache-dir -r requirements.txt && \
        apk --purge del .build-deps

COPY . /Leave-Management-System-lms_current/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]