#INFORMATION FOR THE ASSIGNMENT


For this assignment, using this URL https://lustat.statec.lu/rest/data/LU1,DF_B1100,1.0/.A?dimensionAtObservation=AllDimensions, you can retrieve a pretty huge XML file.

It's main structure looks like that:
```
{
    'message:GenericData': {
    '$': {
    'xmlns:footer': 'http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message/footer',
    'xmlns:generic': 'http://www.sdmx.org/resources/sdmxml/schemas/v2_1/data/generic',
    'xmlns:message': 'http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message',
    'xmlns:common': 'http://www.sdmx.org/resources/sdmxml/schemas/v2_1/common',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xmlns:xml': 'http://www.w3.org/XML/1998/namespace'
    },
    'message:Header': {
    'message:ID': 'IREF010530',
    'message:Test': 'true',
    'message:Prepared': '2024-11-09T15:18:29',
    'message:Sender': [Object],
    'message:Structure': [Object],
    'message:DataSetAction': 'Information',
    'message:DataSetID': 'DSD_B1100'
    },
    'message:DataSet': { '$': [Object], 'generic:Obs': [Array] }
}
```

You'll find all the data you need in ["messageDataSet]["generic:Obs].

There the objects have such a structure:

```
{
    'generic:ObsKey': { 'generic:Value': [Array] },
    'generic:ObsValue': { '$': [Object] },
    'generic:Attributes': { 'generic:Value': [Array]
}
note: not all the entries have a value field
```

The date as well as which kind of entry will be found in the generic:ObsKey, which has such a structure:

```
{
    'generic:Value': [ { '$': [Object] }, { '$': [Object] }, { '$': [Object] } ]
}
```

If you take a closer look at it the "generic:Value" inside the key, you'll get such an array:
```
[
    { '$': { id: 'TIME_PERIOD', value: '1821-01-01' } },
    { '$': { id: 'SPECIFICATION', value: 'C06' } },
    { '$': { id: 'FREQ', value: 'A' } }
]
```

The date is identified with TIME_PERIOD and the type of entry is identified with SPECIFICATION.

The codes are following:
```
{
    TOTAL_POPULATION: "C01",
    POPULATION_DENSITY:"C02",
    MALE_POPULATION : "C03",
    LUXEMBOURGISH_MALE:"C04",
    FOREIGN_MALE:"C05",
    FEMALE_POPULATION:"C06",
    LUXEMBOURGISH_FEMALE:"C07",
    FOREIGN_FEMALE:"C07"
}
```

The count for a certain stat will be found in the "generic:ObsValue" of an object, which has a similar structure to this:

```
{ '$': { value: '182400' } }
```