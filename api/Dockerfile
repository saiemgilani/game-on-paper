FROM python:latest

# set work directory
WORKDIR /src/app

# copy project
COPY . .
# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 7000

# run
CMD ["python", "app.py"]