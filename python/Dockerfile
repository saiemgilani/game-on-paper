FROM rocker/tidyverse:4.1.0 as rbase

WORKDIR /src

# Install R packages
RUN install2.r --error \
    stringr \
    glue \
    devtools

RUN Rscript -e 'devtools::install_github(repo = "sportsdataverse/cfbfastR")'

COPY ./team_agg.R .

RUN Rscript ./team_agg.R skipcache

FROM python:3.10 as base

WORKDIR /root/src

COPY ./requirements.txt ./requirements.txt
COPY ./cfb ./cfb
# COPY ./data ./data

# ---- Dependencies ----
FROM base AS pybuilder
RUN pip install --user -r requirements.txt

FROM base
WORKDIR /code

COPY --from=pybuilder /root/.local /root/.local
COPY --from=rbase /src/data ./data

COPY ./cfb ./cfb
COPY ./utils ./utils
COPY ./__init__.py ./__init__.py
COPY ./app.py ./app.py
COPY ./favicon.ico  ./favicon.ico
COPY ./requirements.txt ./requirements.txt


ARG REDIS_URL
ENV REDIS_URL=${REDIS_URL}
ARG DD_API_KEY
ENV DD_API_KEY=${DD_API_KEY}
ARG DD_LOGGING_ENV
ENV DD_LOGGING_ENV=${DD_LOGGING_ENV}
ARG DD_HOSTNAME
ENV DD_HOSTNAME=${DD_HOSTNAME}
ARG DD_PY_SERVICE
ENV DD_PY_SERVICE=${DD_PY_SERVICE}

ENV PORT=7000
CMD python app.py
