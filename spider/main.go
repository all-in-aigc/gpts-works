package main

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/tidwall/gjson"
)

var (
	env string
)

func main() {
	flag.Parse()

	http.HandleFunc("/gpts/fetch", fetchGpts)

	log.Printf("server start with env: %s\n", env)

	err := http.ListenAndServe(":8069", nil)
	if err != nil {
		log.Fatal("Listen And Server:", err)
	}
}

func init() {
	flag.StringVar(&env, "env", "dev", "--env")
}

func fetchGpts(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		respJson(w, -1, "method not allowed", nil)
		return
	}

	req, err := io.ReadAll(r.Body)
	if err != nil {
		respJson(w, -1, "invalid request", nil)
		return
	}

	params := gjson.ParseBytes(req)
	visitUrl := params.Get("visit_url").String()
	log.Printf("fetch gpts start with url: %s\n", visitUrl)

	if visitUrl == "" {
		respJson(w, -1, "invalid params", nil)
		return
	}

	res, err := requestFetchGpts(visitUrl)
	log.Printf("fetch gpts with error: %s, %v\n", visitUrl, err)
	if err != nil {
		log.Printf("fetch gpts failed: %v\n", err)
		respJson(w, -1, "fetch gpts failed", nil)
		return
	}

	data := res.Get("props.pageProps.gizmo").String()
	if data == "" {
		respJson(w, -1, "fetch gpts failed with invalid data", nil)
		return
	}

	m := map[string]interface{}{}
	json.Unmarshal([]byte(data), &m)

	respJson(w, 0, "ok", m)
}

func respJson(w http.ResponseWriter, code int64, message string, data interface{}) error {
	m := map[string]interface{}{
		"code":    code,
		"message": message,
	}
	if data != nil {
		m["data"] = data
	}

	j, _ := json.Marshal(m)
	fmt.Fprintf(w, "%s", j)

	return nil
}

func requestFetchGpts(visitUrl string) (*gjson.Result, error) {
	browser := getBrowser()

	var res gjson.Result

	err := rod.Try(func() {
		page := browser.MustPage(visitUrl).Timeout(60 * time.Second)
		page.MustWaitStable()

		data := page.MustElement("#__NEXT_DATA__").MustText()
		if data != "" {
			res = gjson.ParseBytes([]byte(data))
		}
	})

	if errors.Is(err, context.DeadlineExceeded) {
		log.Printf("fetch gpts timeout: %s\n", visitUrl)
		return nil, err
	}

	if err != nil {
		log.Printf("fetch gpts got error: %s, %v\n", visitUrl, err)
		return nil, err
	}

	return &res, nil
}

func getBrowser() *rod.Browser {
	if env == "prod" {
		l := launcher.MustNewManaged("ws://127.0.0.1:7317")
		browser := rod.New().Client(l.MustClient()).MustConnect()

		return browser
	}

	browser := rod.New().MustConnect()

	return browser
}
