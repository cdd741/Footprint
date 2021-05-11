# Footprint


* [PART I: Project Overview](https://github.com/cdd741/Footprint#part-i-project-overview)
	* [Description](https://github.com/cdd741/Footprint#--110-description)
	* [Problem](https://github.com/cdd741/Footprint#--120-problem)
	* [User Profile](https://github.com/cdd741/Footprint#--130-user-profile)
	* [Requirements: Use Cases and Features](https://github.com/cdd741/Footprint#--140-requirements-use-cases-and-features)
	* [Tech Stack And APIS](https://github.com/cdd741/Footprint#--150-tech-stack-and-apis)
* [PART II: Client Side](https://github.com/cdd741/Footprint#part-ii-client-side)
	* [Site Map](https://github.com/cdd741/Footprint#--210-site-map)
	* [Screen Deatils](https://github.com/cdd741/Footprint#--220-screen-details)
* [PART III: Sever Side](https://github.com/cdd741/Footprint#part-iii-sever-side)
 	* [End Point Descriptions](https://github.com/cdd741/Footprint#--310-end-point-descriptions)
 	* [External APIs that will be consumed](https://github.com/cdd741/Footprint#--320-external-apis-that-will-be-consumed)
 	* [Database Structure](https://github.com/cdd741/Footprint#--330-database-structure)
* [PART IV: Project Road Map](https://github.com/cdd741/Footprint#part-iv-project-road-map)
* [APPENDIX](https://github.com/cdd741/Footprint#appendix)
	* [Packages and version](https://github.com/cdd741/Footprint/blob/master/README.md#packages-and-version)

## PART I: Project Overview

### - 1.1.0 Description

A photo sharing platform for photographers to share travel photos. Footprint allows users to upload art works that can be edited with descriptions and organized by geographical tagging. Posts can be shared and commented on publicly. Users can browse other users' content by tags and locations and view trending content.

### - 1.2.0 Problem
When people are looking for travel photos and experiences online, there are masterly two places to go, social platforms or travel sites. But neither of them are easy to get an ideal result for a travel avdice. Social platforms nowadays are packed with too much information, users are easily getting distracted and lost in the social network, and information from travel sites are masterly uploaded by organizations and mostly text based. By introducing a light weight travel focusd photo sharing platform, it is providing an easier experience for users to explore nice photos and travel advices of their dream vacation.

### - 1.3.0 User Profile
1. Photographers: posting and sharing art works of travel locations    
   
   The application is providing an easy process for photographers to upload their art works and their work will get more apperence if higher popularity. And the design of the site will help them best display their piece of work.

2. When searching for travel advices, users are more likely looking for a specific destination.
   
   The application is prividing this feature by adding geolocation tag into the post that helps users to search their target more seamlessly. For those users who are just browsing the site, the application is also providing a recommender algorithm using content filtering and collebrative filtering based on trend and browsing history. 


### - 1.4.0 Requirements: Use Cases and Features
1. Viewing post
2. Searching post by location
3. Searching user profile
4. Signing up
5. Signing in
6. Posting photo
7. Commenting post
8. Viewing comments
9. Getting notification when someone commented on user's post

### - 1.5.0 Tech Stack And APIS
1. HTML
2. CSS (SCSS)
3. Javacript
4. React
5. Node.js
6. Express
7. MongoDB
8. Mongoose
9. axios
10. faker
11. React Router
12. js-cookie
13. react-cool-onclickoutside
14. react-dropzone
15. dotenv
16. cors
17. hash.js
18. nodemon
19. uuid
20. multer
21. use-places-autocomplete
22. Material-ui icon
23. Netlify
24. Heroku
25. pusher
26. Google Map Api
:wq
## PART II: Client Side

### - 2.1.0 Site Map
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/interface.png"
        width="600" height="500">
	<p align="center">
</p>

### - 2.2.0 Screen Details
#### - 2.2.1 Home

##### - Post
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/home.png"
        width="1280" height="500">
	<p align="center">
</p>


##### - Comment
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/comment.png"
        width="1280" height="500">
	<p align="center">
</p>


#### - 2.2.2 Signin
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/signin.png"
        width="1280" height="500">
	<p align="center">
</p>


#### - 2.2.3 Signup
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/signup.png"
        width="1280" height="500">
	<p align="center">
</p>


#### - 2.2.4 Upload
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/upload.png"
        width="1280" height="500">
	<p align="center">
</p>


## PART III: Sever Side

### - 3.1.0 End-Point Descriptions
| EndPoints      | Response Format |  
| :------------- | :-------------  | 
| PART I         | March 6         |
| PART II        | April 5         | 
| PART III       | April 24        | 
| PART IV        | May 2           | 
| PART V         | May 9           | 

### - 3.2.0 External APIs that will be consumed
| External API   | Documentation | 
| :------------- | :-------------  | 
| google maps    | https://developers.google.com/maps/documentation       |

### - 3.3.0 Database Structure
<p align="center">
	<img src="https://github.com/cdd741/Footprint/blob/master/Untitled%20Diagram.png"
        width="600" height="600">
	<p align="center">
</p>

## PART IV: Project Road Map
|                | Start date      | Due Date       |
| :------------- | :-------------: | -------------: |
| Page, database and system design         | April 28         | April 29        |
| Database and data structure setup        | April 30         | May 30      |
| Backend functionality implemented    	   | May 1          | May 5 |
| Frntend design implemented         | May 6           | May 9          |
| Advanced visual feature and animation implemented        | May 9           | May 9         |
| testing | May 10 | May 10 |
| Demo day | May 11 | MAy 11 |

## APPENDIX:

### Packages and version
|Packages      | Version      |
| :------------- | :-------------: |
|cors| 2.8.5|
|dotenv| 8.2.0|
|express| 4.17.1|
|faker| 5.5.3|
|hash.js| 1.1.7|
|mongoose| 5.12.6|
|multer| 1.4.2|
|nodemon|2.0.7|
|uuid| 8.3.2|

