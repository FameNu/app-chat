package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Chat struct {
	ID int `json:"id"`
	NameSender string `json:"username"`
	Content string `json:"message"`
}

type JustTextRes struct {
	Message string `json:"message"`
}

func homePage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		return
	}
	
	message := JustTextRes{
		Message: "Welcome to the HomePage!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)

	fmt.Println("Endpoint Hit: homePage")
}

func getAllChat(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/chats" {
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	message := []Chat{
		{
			ID: 1,
			NameSender: "John",
			Content: "Hello, World!",
		},
		{
			ID: 2,
			NameSender: "Doe",
			Content: "Hi, John!",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)

	// fmt.Fprintf(w, "Get all chat")
	fmt.Println("Endpoint Hit: getAllChat")
}

func enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS") // Allowed methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization") // Allowed headers

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func handleRequest()  {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/chats", getAllChat)

	corsHandler := enableCors(http.DefaultServeMux)

	http.ListenAndServe(":3000", corsHandler)
}

func main() {
	fmt.Println("Hello, World!")
	handleRequest()
}
