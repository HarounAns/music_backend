# kiosk_backend

This a serverless lambda backend that we will be using for our Kiosk Applications

## Getting Started
Make sure you have node.js and npm installed on your machine

Run the following in your terminal
```
# clone the repository
git clone https://HarounAnsari@bitbucket.org/HarounAnsari/kiosk_backend.git

# change directory into it
cd kiosk_backend

# install serverless global
npm install -g serverless

# install the rest of packages in package.json
npm i
```

## Set up AWS Config Credentials
Log into the AWS console (create an account if you do not already have one)
Click on your user name at the top right of the page.
Click on the Security Credentials link from the drop-down menu.
Find the Access Credentials section, and copy the latest Access Key ID.
Click on the Show link in the same row, and copy the Secret Access Key.

in your terminal run 
```
serverless config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}
```
replaced with your access key id and secret key

## Deploying with Serverless
Deploy to serverless cloud with
```
serverless deploy
```

It should give you a URL for the lambdas that look like this
```
https://acheigrw9c.execute-api.us-east-1.amazonaws.com/dev
``` 

This is your serverless url, make sure you keep it somewhere, we'll need it for running our tests.

You can check what the GET endpoints return by copying and pasting one into your browser.


## Running tests
Run the tests in your terminal with:
```
SERVERLESS_URL=${SERVERLESS_URL} npm test
```
replaced with the URL we got above from the dployment.
You should get all tests passing and no errors/warnings.

If you dont want to pass in the url everytime, can setup environment variables for yourself locally however you want. 
You can check out .env: 
https://www.npmjs.com/package/dotenv

or store the environment variables locally on your computer.

## Git workflow
Don't commit to master. Instead make your own feature branch, and push to that. 
If you're not familiar with the git feature branch workflow, read up on it here:
https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

Enable pipelines for your branch so that it can run tests using your credentials.
You must store your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as encrypted, secure repository variables. You must also save your SERVERLESS_URL but it does not need to be encrypted.
After that get Haroun to review it and after that he can merge it into master, which will trigger the prod deployment with the production configs.
Hopefully those pass as well, otherwise we have to see why it doesn't.
I'm working on a way to not merge the branch to master until it successfully passes all tests.


