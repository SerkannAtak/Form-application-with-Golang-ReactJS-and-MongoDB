package main

import (
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"time"
)

var client *mongo.Client

type Person struct {
	Firstname string            `json:"name,omitempty" bson:"name,omitempty"`
	Mail  string             	`json:"email,omitempty" bson:"email,omitempty"`
	Message  string             `json:"message,omitempty" bson:"message,omitempty"`
}

func CreatePersonEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	_ = json.NewDecoder(request.Body).Decode(&person) //decode request body to person
	collection := client.Database("goFormDB").Collection("formData") // open collection
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.InsertOne(ctx, person) // insert into collection
	json.NewEncoder(response).Encode(result) //mongo response
}

func main() {
	// Open mongoDB and handle post request with are func(CreatePersonEndpoint)
	clientOptions := options.Client().ApplyURI("Your MongoDB URI")
	ctx, _ := context.WithTimeout(context.Background(), 10* time.Second)
	client, _ = mongo.Connect(ctx, clientOptions)
	router := mux.NewRouter()
	router.HandleFunc("/", CreatePersonEndpoint).Methods("POST")
	http.ListenAndServe(":5000", router)
}
