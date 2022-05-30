# DevOps Sentiment App

* Everytime on pull or push, I can use github workflow to automate my test case when needed, before deloying to the production side. 
* Made a docker container to dockerize my app so that I can facilitate easier deployment in the future. 

## Test it by building the container 
```
docker build -t balloon .
```

## Run the container
```
docker run -d -p 8080:8080 balloon
```

## Browse it at
```
http://localhost:8080
```
