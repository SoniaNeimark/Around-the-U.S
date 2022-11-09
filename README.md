# "Around the U.S."
"Around the U.S." is my pregraduate project for a Web Developer course by [Practicum](https://practicum.com). The project title is actually the title of the sample project, that provided the design, while the current project was coded by me alone and it's contents is not focused on the U.S. particularly.
## Brief UX description
"Around the U.S." is actually a gallery of images, uploaded by users. Users have to log in to see the gallery. The users can register, log in, log out, edit their profiles, add and delete cards with images, add and remove likes to the existing cards. Once they have logged in from their devices, there is no need to reenter email and password to get to the gallery page, though if they log out or don't use the application for 7 days, they would have to log in again.
![alt text](/backend/readmeImages/signup.png "Signup")
![alt text](/backend/readmeImages/login.png "Login")
![alt text](/backend/readmeImages/gallery.png "Gallery")
![alt text](/backend/readmeImages/profile.png "Popup 1")
![alt text](/backend/readmeImages/avatar.png "Popup 2")
![alt text](/backend/readmeImages/addcard.png "Popup 3")

## Technical details
"Around the U.S." is a __MERN__ stack project, i.e. it is created using __MongoDB__ , __Express JS__ , __React__ and __Node Js__. 

### This repository contains:
* The full API of the project (the [/backend folder](https://github.com/SoniaNeimark/react-around-api-full/tree/main/backend)) features user authorization and registration and handles cards and users. The API is created using __Express JS__ and is connected to __MongoDB__ database, where all users and cards data is stored. Users' passwords are hashed using __bcrypt__, all requests are validated using __celebrate__ validation is performed by __Joi__ (combined with __validator__ in some cases, like __email__ or __url__ values validation). The API is hosted [on the server](https://sonia-around.students.nomoredomainssbs.ru), where the __Express__ application is running on top of __Node JS__
* And the contents of the /build folder (the [/frontend folder](https://github.com/SoniaNeimark/react-around-api-full/tree/main/frontend)) of the React application which uses this API and is created in a [separate repository](https://github.com/SoniaNeimark/react-around-auth.git). It is deployed to [the same server](https://sonia-around.students.nomoredomainssbs.ru) where the API is hosted.

Link to the website: https://sonia-around.students.nomoredomainssbs.ru


