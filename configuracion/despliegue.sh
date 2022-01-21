cd configuracion

# Ejecutar ansible para generar imagenes y deployments
ansible-playbook pb-docker.yml
ansible-playbook pb-k8s.yml

# Compilacion de frontend
cd frontend
npm install
ng build --configuration production --base-href "http://www.tangocart.ml"
cd www
echo "www.tangocart.ml" > CNAME
echo pagina-"`date +"%d-%m-%Y--%T"`" > hola.txt

# Proceso de despliegue: Eliminar carpeta, re-crearla, subir cambios a github
cd /bitnami/jenkins/home/workspace
rm -rf pagina
git config --global user.email "jorgek.1994@gmail.com"
git config --global user.name "Jorge Lopez"
git clone https://github.com/jdavidly/sa-g3.git pagina
cd pagina
cp -a /bitnami/jenkins/home/workspace/despliegue/frontend/www/. /bitnami/jenkins/home/workspace/pagina/
git add .
git commit -m "Pagina"
git push origin master
cd ..