# I.PEE.FREELY API

### Dependencies
Originally it was set up to connect to a MySQL database.

If you spin up a MySQL database you can populate it with some data under the 'scripts/datadump.sql'. This will save you some time because we originally had to scrape that from an excel spreadsheet. You might have to derive the schema from the SQL commands but its one table so it shouldnt be to bad.

After you do that you can edit the JSON file at 'i-pee-freely-api/server/datasource.json' to point to your MySQL server.


### How do I start the server?
Just run 'npm start' from the 'i-pee-freely' subdirectory.

```
$ cd i-pee-freely-api
$ npm start

```