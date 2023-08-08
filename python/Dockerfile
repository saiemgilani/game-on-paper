FROM python:3.10 as base

WORKDIR /root/src

COPY ./requirements.txt ./requirements.txt

# ---- Dependencies ----
FROM base AS pybuilder
RUN pip install --user -r requirements.txt

FROM base
WORKDIR /code

COPY --from=pybuilder /root/.local /root/.local
# COPY --from=rbase /src/data ./data

COPY . ./

ENV PORT=7000
CMD python app.py
