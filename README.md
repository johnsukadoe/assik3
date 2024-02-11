# Weather application
The weather application provides real-time weather updates for cities, alerts about natural disasters, and information on air quality. It is developed using Node.js and Express, and it integrates with external APIs to fetch weather data, air quality information, and news about natural disasters.
#### Login Page
### https://weather-asik.onrender.com/login
#### Sign Up page
### https://weather-asik.onrender.com/signin

## Installation
 1.Clone the repository:
```
git clone https://github.com/johnsukadoe/assik3.git
```
2.Navigate to the project directory and install dependencies.
```
npm install
```
3.Start the server:
```
nodemon server.js
```

## Admin:
#### Name: miras
#### Password: qwerty

## Dependencies:
1. Amcharts
2. Axios
3. ejs
4. express
5. express-session
6. mongodb
7. mongoose
8. nodemon

## APIs
1. OpenWeatherMap API - For weather info.
2. Natural Disasters API - For news about natural disasters. (https://www.gdacs.org/)
3. Air quality API - For air quality info in the city. (https://api-ninjas.com/api/airquality)
4. post('/login') - finding one person with equal name and password with query.
5. post('/signin') - creating new user and redirecting to main page.
6. post('/search') - searching weather info with the city and writing in database.
7. post('/edit/:create_time') - finding some user and updating him
8. post('/create') - creating new user.
9. get('/main') - finding last info about weather.
10. get('/air-quality') - finding air quality info with city query and creating some element in database.
11. get('/disasters') - finding news about natural disasters and writing in database
12. get('/history') - getting all infos about weather that requested current user
13. get('/users') - getting all users
14. get('/users/delete/:create_time') - deleting some user
    Also project has some getters that just redirecting to some pages

## IP access to database
![image](https://github.com/johnsukadoe/assik3/assets/116514476/e6c3b13c-7c1f-4197-9abe-50fa5afe2455)

## Bonus task
Using charts in page about air quality. There you can pick some information with buttons on graph and watch quality of air and overall aqi
![image](https://github.com/johnsukadoe/assik3/assets/116514476/c940eded-1cf5-4b0f-9803-8a3b27fb2bde)

## Usage
1)The server runs on port 3000.
2)Firstly you need to sign up or sign in ``` http://localhost:3000 ```(the domain automatically redirect to login page).
![image](https://github.com/johnsukadoe/assik3/assets/116514476/3848afe6-8fa8-498c-9040-964c6a296dbe)
3)After registration, the website redirect to main page, there you can find weather of the some city.
![image](https://github.com/johnsukadoe/assik3/assets/116514476/0b61b3c4-d68f-4f6b-9a5d-8c091017a2b5)
4)Also after the finding weather info about city, you can check it's airquality in link.
![image](https://github.com/johnsukadoe/assik3/assets/116514476/d7eb97bd-ecc7-4ff7-8336-a702a0811fdf)
![image](https://github.com/johnsukadoe/assik3/assets/116514476/c940eded-1cf5-4b0f-9803-8a3b27fb2bde)
5)In the header you can see some links, in link "Natural Disasters" you can read some news about natural disasters(and when you go to the link, news automatically updated and writed on collection 'disasters' in mongodb)
![image](https://github.com/johnsukadoe/assik3/assets/116514476/28f734f8-5446-4f28-9809-cdda04276a8c)
6)History link. In history link you can check your pasts requests about weather information.
![image](https://github.com/johnsukadoe/assik3/assets/116514476/e3dbc3ac-ec3a-4eed-80f0-6fc38f02d2b1)
7)Users link. Users link available only for admins, and there you can create, edit, delete users(also you can't edit yourself, when you trying to do this operations, system automatically redirect you to users link)
![image](https://github.com/johnsukadoe/assik3/assets/116514476/78038f8d-2e13-4579-b80e-de81600dc011)
8)Logout. Last link logout, you just exiting in system.







