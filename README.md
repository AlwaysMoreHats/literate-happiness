# literate-happiness

## How to use

Node Version: 9.2
NPM version: 5.6

Assuming you have checked out a branch, run `npm install` to install necessary node modules

To run the program, type `npm start`. This will run the program with test data. If you want to run
the program with specified data, you can supply it as console arguments
(in the form `npm start <podcasts> <ad_campaigns>`). `<podcasts>` and `<ad_campaigns>` must be in
proper JSON format (or the program will default to using test data).

Developed code is in the src folder. Transpiled code is in the dist. If you are using this with
modules (and thus including dist/adPlatformer.js), the function takes in a single podcast, and an
array of adCampaigns.

## Other modules I did not make:

* Babel (`babel-cli`, `babel-preset-env`): This is for transpiling ES6 format to usable javascript

# See Also

I did make a pull request from another branch that does search everything to find the best value,
but I chose not to include it due to complexity reasons (it's fine for a small set of campaigns but
horrendous for large campaigns, being what I believe is O(n!)). See
[PR #1](https://github.com/YeahButHats/literate-happiness/pull/1) if you are interested.
