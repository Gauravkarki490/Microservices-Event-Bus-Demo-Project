# Kubernetes `kubectl` & Docker Commands & Service Types Explained

## Common `kubectl` Commands

| Command                                               | Description                                          |
| ----------------------------------------------------- | ---------------------------------------------------- |
| `kubectl get pods`                                    | List all pods in the current namespace               |
| `kubectl get services`                                | List all services                                    |
| `kubectl get deployments`                             | List all deployments                                 |
| `kubectl get nodes`                                   | List all nodes in the cluster                        |
| `kubectl describe pod <pod-name>`                     | Show detailed info about a specific pod              |
| `kubectl describe deployments <dep-name>`             | Show detailed info about a specific deployment       |
| `kubectl describe services <serv-name>`               | Show detailed info about a specific service          |
| `kubectl logs <pod-name>`                             | Show logs from a pod                                 |
| `kubectl apply -f <file.yaml>`                        | Apply a configuration file (create/update resources) |
| `kubectl delete -f <file.yaml>`                       | Delete resources defined in a file                   |
| `kubectl exec -it <pod-name> -- /bin/sh`              | Open a shell inside a running pod                    |
| `kubectl rollout restart deployment <deployment>`     | Restart all pods in a deployment                     |
| `kubectl scale deployment <deployment> --replicas=3`  | Change the number of pod replicas in a deployment    |
| `kubectl port-forward svc/<service> <local>:<remote>` | Forward a service port to your local machine         |
| `kubectl get all`                                     | List all resources in the current namespace          |

---

## Common Docker Commands

| Command                                   | Description                                      |
| ------------------------------------------ | ------------------------------------------------ |
| `docker build -t <name>:<tag> .`           | Build a Docker image from the Dockerfile         |
| `docker images`                            | List all local Docker images                     |
| `docker run -p <host>:<container> <image>` | Run a container and map ports                    |
| `docker ps`                                | List running containers                          |
| `docker stop <container-id>`               | Stop a running container                         |
| `docker rm <container-id>`                 | Remove a stopped container                       |
| `docker rmi <image-id>`                    | Remove a Docker image                            |
| `docker tag <src> <user>/<repo>:<tag>`     | Tag an image for a repository                    |
| `docker push <user>/<repo>:<tag>`          | Push an image to Docker Hub                      |
| `docker pull <user>/<repo>:<tag>`          | Pull an image from Docker Hub                    |
| `docker login`                             | Log in to Docker Hub                             |
| `docker logout`                            | Log out from Docker Hub                          |
| `docker exec -it <container-id> /bin/sh`   | Open a shell inside a running container          |

---

## Kubernetes Service Types

### 1. ClusterIP (default)

- **Internal-only access.**
- Exposes the service on a cluster-internal IP.
- **Use case:** Communication between pods/services inside the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

---

### 2. NodePort

- **External access via <NodeIP>:<NodePort>.**
- Exposes the service on each node’s IP at a static port (30000–32767).
- **Use case:** Simple external access for development/testing.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
```

---

### 3. LoadBalancer

- **External access via cloud provider’s load balancer.**
- Provisions an external load balancer (supported in cloud environments).
- **Use case:** Production-grade external access.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

---

### 4. ExternalName

- **Maps service to a DNS name.**
- No proxying; returns a CNAME record.
- **Use case:** Accessing external services by DNS name from within the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: ExternalName
  externalName: example.com
```

---

## Summary Table

| Type         | Internal Access | External Access | Use Case                         |
| ------------ | --------------- | --------------- | -------------------------------- |
| ClusterIP    | Yes             | No              | Internal microservice comms      |
| NodePort     | Yes             | Yes (Node IP)   | Dev/test, simple external access |
| LoadBalancer | Yes             | Yes (LB IP)     | Production, cloud environments   |
| ExternalName | No              | No              | DNS alias for external service   |

---

## Tips

- Use `kubectl get <resource>` to list resources.
- Use `kubectl describe <resource> <name>` for detailed info.
- Use `kubectl apply -f <file>` to create/update resources.
- Use `kubectl delete -f <file>` to remove resources.
- Use `docker build`, `docker run`, and `docker push` for container management.

---

**Happy Kubernetes-ing and