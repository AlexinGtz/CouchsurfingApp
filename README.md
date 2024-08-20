# /Couchsurfing App

Steps to run the repo in docker
1. Clone repository
2. Build the docker image
    `docker build -f dockerfile -t CouchsurfingAppv1.0 .`
3. Run the Docker Image
    `docker run -d -it --rm -p 5000:5000 --name couchsurfing-app <image-id>`
4. Make requests in postman to 
    GET `http://localhost:5000/userRelationship/2/5`

You can access the CRUD with the following endpoints:
-  GET `http://localhost:5000/users/<user-id>`
-  POST `http://localhost:5000/users`
-  PATCH `http://localhost:5000/users`
-  DELETE `http://localhost:5000/users/<user-id>`

For the POST endpoint you should send a body with the following structure:
```
    {
        "id": "12234",
        "name": "John Doe",
        "age": 20,
        "friends": ["1", "3"]
    }
```

For the PATCH endpoint it is the same as above but just the ID is mandatory