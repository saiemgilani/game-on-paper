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

# ---- Dependencies ----
FROM base AS pybuilder
RUN pip install --user -r requirements.txt

FROM base
WORKDIR /code

COPY --from=pybuilder /root/.local /root/.local
COPY --from=rbase /src/data ./data

COPY . ./

EXPOSE 7000
ENV PORT=7000
CMD python app.py
