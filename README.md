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

## URLs that work

I've defined the following endpoints:

    GET /villagers

      Fetches a list of every villager.

      Example Output:
      [
        {
          "_id": "5ff016a9ac510bc215962edd",
          "name": "Judy",
          "species": "CUB",
          "personality": "SNOOTY",
          "photo": "/images/judy.jpg",
          "__v": 0
        },
        {
          "_id": "5ff016a9ac510bc215962ede",
          "name": "Wolfgang",
          "species": "WOLF",
          "personality": "CRANKY",
          "photo": "/images/wolfgang.jpg",
          "__v": 0
        },
        {
          "_id": "5ff0384ba1a70cda21827422",
          "name": "Raymond",
          "species": "CAT",
          "personality": "SMUG",
          "photo": "/images/raymond2.jpg",
          "__v": 0
        }
      ]

    GET /villagers/:id

        Fetches an individual villager's record, if you know that villager's ID.

        Example Output:
        {
          "_id": "5ff016a9ac510bc215962edd",
          "name": "Judy",
          "species": "CUB",
          "personality": "SNOOTY",
          "photo": "/images/judy.jpg",
          "__v": 0
        }

    CREATE /villagers

        Create a new villager, based on JSON provided in the request body.

        Output: A copy of the created record.

    PUT /villagers/:id
    PATCH /villagers/:id
    DELETE /villagers/:id

    I haven't had time to document these yet.

## Running Complex Queries

It's possible, but difficult, to do fancy REST queries from your browser. You can download a graphical tool called [Postman](https://www.postman.com/) that will help you out. I prefer a Mac tool called [Paw](https://paw.cloud/) but it costs money.

## Bugs and Limitations

There are so many of them! Off the top of my head:

   * There is no authentication or authorization of any kind. Normally APIs like
     this are guarded with OAuth2 and JWT tokens, etc. Not this one!
   * There is no validation of any kind. When creating a villager, you should give
     that villager a name, but the backend does nothing to ensure that you have
     done this. For that matter, you shouldn't be able to create two villagers
     with the same name, but we don't check for that, either.
   * There's no pagination on the main GET method. If you had 100,000 villagers
     but only wanted to look at them in batches of 50, you are out of luck.
   * The image URLs are fake. If you want to look at a picture of Raymond, you're
     on your own.
   * One last thing, API URLs are typically versioned and look something like `/api/v1/villagers`.
     This API isn't, though it would be easy enough to add that in.
