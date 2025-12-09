# csc372-feetfirst

[Demo Link](https://uncg-my.sharepoint.com/:v:/g/personal/tngachunga_uncg_edu/IQAGC35V0iGcQJMteU-EL17mAU89UFMDIX7S_N7GK8TyeqI?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=IMPcn3)


### Set Up

This application uses node to run the server. Connect the application to the PostgreSQl database of your choice, remote or local and set the port you would like it to run on. Feel free to create accounts, upload race images, and more.


### Reflection:
**Design Choices: Why you chose your frontend framework, backend structure, and database schema**
I chose to use EJS for the frontend to try something new, as I already have some experience with React.

I have three tables in my database.
- Users : stores users, passwords, bios, profile images
- Races : stores races, race info
- Race_Participant : maps races to users who have rsvp'ed

I found that this schema was enough to implement Feet First without having more data management than necessary.

I use my own user authentication for the backend, since I personally don't like linking my google accounts to everything. Because I'm not using Google authentication, users can just create accounts with a username and password. I'm keeping it simple and old school.

**Challenges: Technical or conceptual hurdles you faced and how you solved them**
- Implementing user sessions with middleware

**Learning Outcomes: What you learned about full-stack development and deployment**

I learned just how tedious backend development can be. I would think of a useful endpoint for the server, and then realize I don't know its place in the front end. Other times, I would want to have something on a certain page, but realize it would take quite a while to implement it in the backend in a clean, efficient way. I personally did not have great concern for data security since there is no sensitive data on Feet First, so in a way, I was playing on easy mode.

Full stack development is beyond interesting, even when it's a little exhausting. I enjoyed the convenience of deploying to Render, but I would love to have been able to learn how to deploy my website to my own local machine.

**Future Work: Features you would add or refine with more time**
- Races containing locations/coordinates
- An algorithm for showing users races that are of their favorite distance on the homepage
- Favorite Shoes display on profile
- Refine the browse races page, add a search function


## Deployed

[Deployed To Render](https://feetfirst.onrender.com)
