<<<<<<< HEAD
S3 Share aka S4
===============

Web front end to distribute files to users backed by AWS S3.

Features
--------
+ Expose diffrent folders to different users
+ Download files directly from S3
+ Administrative interface to manager users
+ Old school web app (not SPA)
+ No JavaScript on the client (ironically)


Stack
-----
+ Node.js
+ Bootstrap
+ MongoDB


S3 Bucket Structure
-------------------

Create a Bucket (or use an existing Bucket) and create a folder within the bucket called 'downloads'. Within downloads create individual folders
for each customer and put the files you want to share with the customer. While creating a user assign the folder name as customer id to the user.


Disclaimer
---------
I am a node newbie and I am pretty sure this codebase has newbie mistakes everywhere and probably is not very idiomatic.
=======
s4
==

S3 File Share (aka S4)
>>>>>>> 1b8f9cb3f0eb03242ace4f0bcfb57221b574aa83
