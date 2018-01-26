# literate-happiness

## How to use

Assuming you have checked out the master branch, run `npm install` to install necessary node modules

To run the program, type `npm start`. This will run the program with test data. If you want to run
the program with specified data, you can supply it as console arguments
(in the form `npm start <podcasts> <ad_campaigns>`). `<podcasts>` and `<ad_campaigns>` must be in
proper JSON format (or the program will default to using test data).

## Other modules I did not make:

* Babel (`babel-cli`, `babel-preset-env`): This is for transpiling ES6 format to usable javascript
