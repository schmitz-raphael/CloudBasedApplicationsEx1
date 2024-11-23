# Steps to Deploy

## Start Minikube Cluster

1. Start Minikube with multiple nodes (1 control plane + 2 workers):

```
minikube start --nodes=3
```

2. Verify the cluster:

```
kubectl get nodes
```

## Build the Docker Image in Minikube


Build the Docker image for the REST API:

```
docker build -t statec-rest-api
```

Verify the image:

```
docker images
```

## Apply the Deployment and Service

Deploy the application using kubectl:

```
kubectl apply -f deployment.yaml
```

Verify the deployment:

```
kubectl get deployments
kubectl get pods
```
Verify the service:

```
kubectl get svc
```

## Access the Application

Get the NodePort:

```
kubectl get svc statec-rest-api-service
```
Note the NodePort under the PORT(S) column, e.g., 8000:31234/TCP.

Find Minikube's IP:

```
minikube ip
```
Access the API: Use http://<minikube-ip>:<NodePort>/<YEAR> in your browser or with tools like curl.

Example:

curl http://192.168.49.2:31234/2020

6. Scale the Deployment (Optional)

Increase or decrease the number of replicas:

kubectl scale deployment statec-rest-api-deployment --replicas=3

Verify the updated pods:

kubectl get pods

