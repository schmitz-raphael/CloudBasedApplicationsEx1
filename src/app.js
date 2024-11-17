// Import required modules
const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();
const PORT = 8000;


// Define the base URL of the Statec API (replace this with the actual API URL)
const STATEC_API_URL = 'https://lustat.statec.lu/rest/data/LU1,DF_B1100,1.0/.A?dimensionAtObservation=AllDimensions';

//didn't include the population density, as it was not demanded in the exercice sheet, but it can be added at any time by just uncommenting the line
const DATA_CODES = {
    C01: "TOTAL_POPULATION",
    //C02: "POPULATION_DENSITY",
    C03: "MALE_POPULATION",
    C04: "LUXEMBOURGISH_MALE",
    C05: "FOREIGN_MALE",
    C06: "FEMALE_POPULATION",
    C07: "LUXEMBOURGISH_FEMALE", 
    C08: "FOREIGN_FEMALE"
};

// Function to filter dataset based on the year
function filterDataSet(dataSet, year) {
    return dataSet.filter(obs => {
        const timePeriod = obs['generic:ObsKey']['generic:Value'].find(val => val['$'].id === 'TIME_PERIOD')?.['$'].value;
        if (timePeriod) {
            const yearFromTimePeriod = timePeriod.split('-')[0];  // Extract the year from the TIME_PERIOD (e.g., "1846-12-03")
            return yearFromTimePeriod === year.toString();
        }
        return false;
    });
}

// Function to fetch population data from the Statec API for a specific year
async function fetchPopulationData(year) {
    try {
        const response = await axios.get(STATEC_API_URL, {
            headers: {
                'Accept': 'application/xml',  // Request XML response
            }
        });

        if (response.status !== 200) {
            console.error('Error: Failed to fetch data from Statec API. Status code:', response.status);
            return [];
        }

        // Create XML parser
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedResponse = await parser.parseStringPromise(response.data);

        // Retrieve the entries from the dataset
        const dataSet = parsedResponse["message:GenericData"]["message:DataSet"]["generic:Obs"];

        // Filter the dataset by the specified year
        const filteredData = filterDataSet(dataSet, year);
        if (filteredData.length == 0) {
            for (let i = -1; i <= 1; i += 2) {
                let j = 1;
                //only look if there's something 20 years in the past/future
                while (j<= 20) {
                    let data = filterDataSet(dataSet, year + i * j);
                    if (!data.length) {
                        j++;
                    }
                    else{
                        data.forEach(entry => {filteredData.push(entry)});
                        break;
                    }
                }
            }
        }
        return filteredData;
    } catch (error) {
        // Log the error for debugging
        console.error('Error in fetchPopulationData:', error.message);
        return [];
    }
}

// Set up the route to handle year-based requests
app.use(express.json());

app.get("/:year", async (req, res) => {
    const year = parseInt(req.params.year);

    if (!year) {
        return res.status(404).json({ error: "Year is required" });
    }

    const data = await fetchPopulationData(year);
    if (data.length === 0) {
        console.log('No data found for the given year.');
        return res.status(404).json({ error: `No data found for year ${year}` });
    }
    const output = [];
    data.forEach(entry => {

        const type = entry["generic:ObsKey"]["generic:Value"].find(val => val['$'].id === 'SPECIFICATION')?.['$'].value;
        const timePeriod = entry["generic:ObsKey"]["generic:Value"].find(val => val['$'].id === 'TIME_PERIOD')?.['$'].value
        if (entry["generic:ObsValue"]){
            const count = entry["generic:ObsValue"]["$"]["value"]

            if (type && DATA_CODES[type]) {
                output.push({
                    type: DATA_CODES[type],
                    timePeriod:timePeriod,
                    count: count,
                });
            }
        };
        
    });
    return res.status(200).json(output);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
