# Steps to Deploy

## Start Minikube Cluster

1. Start Minikube:

```
minikube start
```

2. Inspect the docker-env for minikube:

```
minikube docker-env
```

3. Copy the command to point the shell to Minikube's docker daemon (depends on your OS)
For windows:
```
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

## Build the Docker Image in Minikube


Build the Docker image for the Minikube docker daemon:

```
docker build -t statec-rest-api .
```

Verify the image was built:

```
docker images
```

## Apply the Deployment and Service

Deploy the application as well as the service using kubectl:

```
kubectl apply -f deployment.yaml
```
```
kubectl apply -f service.yaml
```

## Verify the service is running
```
kubectl get nodes
```

## Create a tunnel to access the node

```
minikube tunnel
```

## Access the website

The service is now available on ```127.0.0.1:8000/<Year>```


Full video with a setup can be found here: https://youtu.be/FhHEFM8wDNw