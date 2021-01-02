# Express API Example for Nicole

If you're not Nicole, you don't care about any of this.

## What This Does

I started building an Animal Crossing villager hunt bingo card API. Then I realized that you only
needed one endpoint to see how REST works with Express, so I've only added a `villager` endpoint.

## Setup

I installed MongoDB and NodeJS with [Homebrew](https://brew.sh/). Assuming you have
Homebrew, all you need to do is this:

    brew tap mongodb/brew
    brew install mongo-community
    brew install nodejs

To start up MongoDB without having it start every time you start up your Mac (The Sims is slow enough as it is), do this:

    mongod --config /usr/local/etc/mongod.conf

To run the app after you've cloned this repo, do this:

    npm install
    node app.js

I'm sure there's a better way to do it, but this is OK for now.

## Visit the App in Your Browser

Go to [http://localhost:3000](http://localhost:3000/) once you've started the app server.

## Complex Queries

It's possible, but difficult, to do fancy REST queries from your browser. You can download a graphical tool called [Postman](https://www.postman.com/) that will help you out. I prefer a Mac tool called [Paw](https://paw.cloud/) but it costs money.
