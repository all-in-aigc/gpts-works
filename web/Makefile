dev:
	pnpm dev --hostname 0.0.0.0 --port 8067

docker-build:
	sudo docker build -t gptsweb:v1.3.2 -f deploy/Dockerfile . 

docker-run:docker-build
	sudo docker run -d --name=gptsweb --restart=always -p 8037:3000 gptsweb:v1.3.2

