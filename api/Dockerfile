FROM python:latest as base 

# set work directory
WORKDIR /root/src

COPY ./requirements.txt ./requirements.txt

# ---- Dependencies ----
FROM base AS pybuilder
RUN pip install --user -r requirements.txt

FROM base
WORKDIR /code
COPY --from=pybuilder /root/.local /root/.local
COPY . .

# run
CMD ["python", "app.py"]