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

* [Body-parser](https://www.npmjs.com/package/body-parser) to help with the request from the forms. Is een middel wat je met express kan gebruiken om formulieren makkelijk uit te lezen. Om inlog en registreer formulieren te gebruiken. Heb hiermee gewerkt bij backend 2 jaar geleden en het beviel hiermee en het is een bekende package. 

* [Argon2](https://www.npmjs.com/package/argon2) to safe my password in a hesh (more safety). Om wachtwoorden niet als plain tekst op te slaan maar om te heshen. om een gehest wachtwoord in de database te zetten. Zo kan je het opslaan op een veilige manier. Zo kan je het ook valideren als iemand zn wachtwoord invoert. Het zag er makkelijk uit om te gebruiken en zo werkt het ook. 

* [Multer](https://www.npmjs.com/package/multer) to upload an image in my form. Een express middel om het uploaden van files via een formulier mogelijk te maken. En om weg te schrijven naar de mappenstructuur om ze terug te vinden. 

* [Nodemon](https://github.com/remy/nodemon) makes it easier to use the server. Klein pakketje zodat ik niet elke keer mijn node server opnieuw hoef op te starten. Dat als ik opsla dat ik niet elke keer een nieuwe server aan hoef te zetten. 

* [Mongodb](https://www.mongodb.com/) the database to save data in. Om data op te slaan in een no-sql database. Met backend heb ik hier ook mee gewerkt en werkte toen relatief goed. Ook de mongodb compass is handig om je data te zien. 

## To do's
- [x] Make a working server
- [x] Let users make an account, log in and log out
- [x] Finding matches in the dashboard
- [x] Delete function to delete your profile
- [ ] More personal information to make matchs better
- [ ] Lets a user chat with the match and sens pictures to eachother

## Final words
For me this was a tough course, but after all very interesting. In the beginning it was a lot of information that I didn't know what to do with. I like to work on something where you can see results. For me it was difficult to build something and see almost nothing change. After many more hours than expected, I was able to build what I wanted to build and finally saw some results. When this happened I was much more motivated to spend more hours on it and build the thing that I wanted to build. It is cool to see that I am building something that works, mainly because I started to think how I would do this. I have learned a lot from the theory, but especially the process itself.
