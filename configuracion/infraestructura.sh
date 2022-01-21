
cd configuracion

# Iniciar, ver plan y aplicar las configuraciones de terraform
terraform init
terraform plan
#terraform destroy -auto-approve
terraform apply -auto-approve

# Habilitar el uso de kubectl
gcloud container clusters get-credentials clustersa --zone us-central1-a --project bitnami-xu3-sljbbg

# Configurar ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
#helm install nginx-ingress ingress-nginx/ingress-nginx --set controller.publishService.enabled=true
helm upgrade --install nginx-ingress ingress-nginx/ingress-nginx --set controller.publishService.enabled=true
