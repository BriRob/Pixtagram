# Pixtagram 

Pixtagram is a pixel perfect clone of [Instagram](https://www.instagram.com/) where users can share posts with other users. They can show their support by liking and commenting on other's posts.

Check out [Pixtagram](https://pixtagramapp.herokuapp.com/)

## Index

[MVP Feature List](https://github.com/BriRob/Pixtagram/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/BriRob/Pixtagram/wiki/Pixtagram-DB-Schema) |
[User Stories](https://github.com/BriRob/Pixtagram/wiki/Pixtagram-User-Stories)


## Technologies Used

<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height=40/><img src="https://camo.githubusercontent.com/a1b2dac5667822ee0d98ae6d799da61987fd1658dfeb4d2ca6e3c99b1535ebd8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d3336373041303f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d666664643534" height=40/><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" height=40 /><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" height=40/><img src="https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642" height=40/><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" height=40/><img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" height=40/><img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" height=40/><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height=40/> <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" height=40/>

## Getting started
1. Clone this repository:

   ```bash
   git clone https://github.com/BriRob/Pixtagram.git
   ```

2. Install dependencies with the following:

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file using the **.envexample** provided 

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
   
 6. Now you can use the Demo user or create an account

***

## Features

# Users
* Guests can create a new account on Pixtagram
* Logged in Users can read/view the profile's of other users
* Logged in Users can update/edit their profile details and change their profile picture
* Logged in Users can delete their profile

# Posts
* Logged in users can create a new post
* Logged in users can read/view all of the posts on their feed
* Logged in users can update/edit their post caption
* Logged in users can delete their own post

# Comments
* Logged in users can create a new comment on posts
* Logged in users can read/view all of the comments on a post
* Logged in users can delete their comments

# Likes
* Logged in users can create likes on a post
* Logged in userse can remove likes on a post

# Search
* Logged in Users can seach for other others on Pixtagram

