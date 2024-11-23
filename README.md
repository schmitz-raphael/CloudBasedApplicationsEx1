
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
http://localhost:8000/2000
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

In case data for the given year is not found it fetches the data immediately, it looks for the 2 closest matches before and after in a span defined by the SEARCH_THRESHOLD constant (currently set to 20 years) to avoid an infinite loop if a date before the first entry or in the future is entered.

Example Response for the year 1873, which has no entries:

```
[
    {
        "type": "FEMALE_POPULATION",
        "timePeriod": "1871-12-01",
        "count": "99283"
    },
    {
        "type": "FOREIGN_MALE",
        "timePeriod": "1871-12-01",
        "count": "3613"
    },
    {
        "type": "TOTAL_POPULATION",
        "timePeriod": "1871-12-01",
        "count": "204028"
    },
    {
        "type": "MALE_POPULATION",
        "timePeriod": "1871-12-01",
        "count": "98245"
    },
    {
        "type": "LUXEMBOURGISH_MALE",
        "timePeriod": "1871-12-01",
        "count": "94632"
    },
    {
        "type": "LUXEMBOURGISH_FEMALE",
        "timePeriod": "1871-12-01",
        "count": "97024"
    },
    {
        "type": "FOREIGN_FEMALE",
        "timePeriod": "1871-12-01",
        "count": "2259"
    },
    {
        "type": "FEMALE_POPULATION",
        "timePeriod": "1875-12-01",
        "count": "102049"
    },
    {
        "type": "FOREIGN_MALE",
        "timePeriod": "1875-12-01",
        "count": "3745"
    },
    {
        "type": "TOTAL_POPULATION",
        "timePeriod": "1875-12-01",
        "count": "204606"
    },
    {
        "type": "MALE_POPULATION",
        "timePeriod": "1875-12-01",
        "count": "103109"
    },
    {
        "type": "LUXEMBOURGISH_MALE",
        "timePeriod": "1875-12-01",
        "count": "99364"
    },
    {
        "type": "LUXEMBOURGISH_FEMALE",
        "timePeriod": "1875-12-01",
        "count": "99899"
    },
    {
        "type": "FOREIGN_FEMALE",
        "timePeriod": "1875-12-01",
        "count": "2150"
    }
]
```

Example for the year 2044, which is at the limit of being in the search-threshold:
```
[
    {
        "type": "FEMALE_POPULATION",
        "timePeriod": "2023-12-31",
        "count": "333776"
    },
    {
        "type": "FOREIGN_MALE",
        "timePeriod": "2023-12-31",
        "count": "163599"
    },
    {
        "type": "TOTAL_POPULATION",
        "timePeriod": "2023-12-31",
        "count": "672050"
    },
    {
        "type": "MALE_POPULATION",
        "timePeriod": "2023-12-31",
        "count": "338274"
    },
    {
        "type": "LUXEMBOURGISH_MALE",
        "timePeriod": "2023-12-31",
        "count": "174675"
    },
    {
        "type": "LUXEMBOURGISH_FEMALE",
        "timePeriod": "2023-12-31",
        "count": "179697"
    },
    {
        "type": "FOREIGN_FEMALE",
        "timePeriod": "2023-12-31",
        "count": "154079"
    }
]
```

Another example outside the treshold:

```
{
    "error": "No data found for year 1502"
}
```


## Error Handling

The service handles input errors and missing data gracefully:

- Invalid Year: If the year parameter is missing or not an integer, the server responds with a 400 error code

