#### Project README 

## Running the Application
To start the application, run the following command:

```bash
      npm run dev
```

## Accessing the API
The default route for accessing the API is:
[Drupal](http://localhost:3000/api/v1/auth)


## User Login
To log in, send a POST request to the following URL:
[Drupal](http://localhost:3000/api/v1/auth/login)

Make sure to include the necessary credentials in the request body to receive a Bearer token. This token will be used for authorization in subsequent requests.


## Get User Profile
To retrieve user profile data, use the following endpoint:
[Drupal](http://localhost:3000/api/v1/auth/profile)

Make sure to include the Bearer token in your request header for authentication. Here’s an example of how to include the token:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmJhNDg2ODkzZDVmMmExMGI0ZDMxMiIsImlhdCI6MTcyMzU3MzM4MiwiZXhwIjoxNzI2MTY1MzgyfQ.RV7hXt7Ge7ZPVhsvA95j89HsPnbh1CGolL-QXbdRYlw


## Testing with Sample Data
For testing purposes, user data is available in the __users.json__ file located in the project directory. Feel free to use this data to test the code and ensure everything is working correctly.


## Database Information
I am using a MongoDB database that is always open and freely accessible.