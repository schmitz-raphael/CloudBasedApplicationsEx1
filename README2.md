
#Docker deployment for the API

1. Build the Docker Image

Run the following command to build the Docker image:

```
docker build -t statec-rest-api 
```

2. Run the Docker Container

Run the following command to start the application in a Docker container:

```
docker run -d -p 8000:8000 statec-rest-api
```

3. Access the REST Application

In order to access this API, it's exactly the same as running it locally on your machine. In short you can access it using this url.

```http://localhost:8000/<YEAR>```

Replace <YEAR> with the year you want to query, e.g., http://localhost:8000/2020.

For more details please consult the first README.