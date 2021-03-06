![alt text](https://github.com/labraksam/assessment-2.md/blob/master/screenshot.png "RelationshipGoals")


# RelationshipGoals
RelationShip goals is a site for people with different lifegoals to meet up. Its possible to register, log-in and find matches that have the samen lifegoals. Its also possible to upload your own profile picture, be in a session and delete your account.

## How to install
To install this, you have to follow a few steps.

**Clone git**

* Open your terminal and do ```cd``` with the name of the folder where you want to place it in.
* Run the following code to clone it to the folder.

```
clone https://github.com/labraksam/be-assessment-2.git
```

**Install Mongodb**

To save all the data you have to install Mongodb

* First install Homebrew to help install Mongodb

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

then install Mongodb

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew tap mongodb/brew
brew install mongodb-community@4.0
```

* In another tab in your terminal, you have to make a database folder with the following code.

```
mongod --dbpath db
```

Go back to the previous tab, and make a mongo database. Use two different tables. A ```user``` and ```lifegoals```.
```
mongo
use relationshipgoals
db.runCommand( { create: "users" } )
db.runCommand( { create: "lifegoals" } )
```

* After creating it, you have to make sure the database is connected. ```cd``` to the main folder where you store the secret database info.
```
touch .env


DB_HOST=localhost
DB_USER=root
DB_PORT=27017
DB_NAME=relationshipgoals
SESSION_SECRET=secret_message
```

Install npm to go further

```
npm install
```

**Run the server**

To run the server, use nodemon. Use the following line in your terminal.
```
nodemon server/index.js
```
The website is now available at localhost:8080. Have a look!

## Tech I used
For the RelationshipGoals platform I used the following things

* [NodeJS](https://nodejs.org/en/) is used to make the project in. 

* [Body-parser](https://www.npmjs.com/package/body-parser) to help with the request from the forms. It is a tool that you can use with Express to easy read forms. Mainly the login and register form. Used this at the Backend course 2 years ago and was really happy with it and so I still use it. Also it is one of the most famous packages in this kind. 

* [Argon2](https://www.npmjs.com/package/argon2) to safe my password in a hesh (more safety). It is used to save the passwords not as plain thekst in a file but in a hesh. Also to put this heshed password in th database. Using this will make it more secure to work with data from users. You can also validate it in this way. It is a really simple thing to use. Since im not really experienced with the tech, i will choose for something that is easy to use. In this case it was Argon2. 

* [Multer](https://www.npmjs.com/package/multer) it is used to upload files via a form. Also it will help to write away the files to the folder structure to easily find them back. Works really well. 

* [Nodemon](https://github.com/remy/nodemon) makes it easier to use the server. Its a small package that i use for not everytime i use the node server i have to restart it. Evertime i make a change, it will restart itself. 

* [Mongodb](https://www.mongodb.com/) the database to save data in a no-sql database. I used to work with this at the backand course two years ago and i really liked working with it. Also now with the Mongodb compass. It is really nice to see your data in a nice interface.

## To do's
- [x] Make a working server
- [x] Let users make an account, log in and log out
- [x] Finding matches in the dashboard
- [x] Delete function to delete your profile
- [ ] More personal information to make matchs better
- [ ] Lets a user chat with the match and sens pictures to eachother

## Final words
For me this was a tough course, but after all very interesting. In the beginning it was a lot of information that I didn't know what to do with. I like to work on something where you can see results. For me it was difficult to build something and see almost nothing change. After many more hours than expected, I was able to build what I wanted to build and finally saw some results. When this happened I was much more motivated to spend more hours on it and build the thing that I wanted to build. It is cool to see that I am building something that works, mainly because I started to think how I would do this. I have learned a lot from the theory, but especially the process itself.
