dev:
	go run main.go --env=dev

tst:
	pm2 start deploy.sh --name gptspider

rod:
	docker run -d --name=go-rod -p 7317:7317 ghcr.io/go-rod/rod