# Population Data API - README

This API provides access to population data from Luxembourg's STATEC service for various demographic categories. It fetches XML data from STATEC, filters it by the specified year, and returns JSON-formatted demographic statistics.
## Prerequisites

To use this service, ensure the following dependencies are installed:

- Node.js (v12+)
- Express
- Axios
- xml2js

Install dependencies by running:
```
npm install express axios xml2js
```

## Project Structure

- app.js: Main application file
- Dependencies: axios, xml2js, express, fs (for file handling)

## Running the Server

Start the server using:
```
node app.js
```
By default, the server listens on port 8000.

Access the running server at:
```
http://localhost:8000
```
## Usage

This API provides population data for a specific year. The data is organized into demographic categories (e.g., total population, male population).
API Endpoints
Fetch Population Data by Year

Request Format
```
GET /:year
```
Parameters:
- year (integer): The year for which population data is requested.

Example Request To request data for the year 2020, send a request to:
```
http://localhost:8000/2020
```
Example Response

A successful request returns an array of demographic statistics for the specified year:
```
[
    {
        "FEMALE_POPULATION": "222400",
        "timePeriod": "2000-12-31"
    },
    {
        "TOTAL_POPULATION": "439000",
        "timePeriod": "2000-12-31"
    },
    {
        "MALE_POPULATION": "216600",
        "timePeriod": "2000-12-31"
    }
]
```
## Error Handling

The service handles input errors and missing data gracefully:

- Invalid Year: If the year parameter is missing or not an integer, the server responds with a 404 error code


## Internal Functions

- filterDataSet: Filters the dataset for a specific year.
- fetchPopulationData: Fetches and parses data from STATEC. If no data is found for the requested year, the function searches for data in adjacent years until it finds relevant data.

