//Set OpenAI API Key Here
const API_KEY = '';

//Set Filestack API Key Here
let FILESTACK_API_KEY = '';

// Select Table 1 and format data. The "Formula" column combines a "Prompt" column and "Completions" column using this formula: '{"prompt": "'&Prompts&'\n\n###\n\n", "completion": "'&Completions&'###"}'
let table = base.getTable("Table 1");
let query = await table.selectRecordsAsync({fields: ['Formula']});
output.table(query.records);
let array = "";
for (let i = 0; i < query.records.length; i++) {
  let formula = query.records[i].getCellValue("Formula");
  output.text(formula);
  let end="";
  if (i==query.records.length){
  } else {
    end = "\n";
  }
  array=array+formula+end;
}



//Unsure if this next step is needed, but wanted to save the file to Airtable to review. This required posting the file somewhere first, so I chose Filestack

let response1 = await remoteFetchAsync('https://www.filestackapi.com/api/store/S3?key='+FILESTACK_API_KEY, {
    method: 'POST',
    body: array,
    headers: {
        'Content-Type': 'application/json',
    },
});
let respJSON1 = await response1.json();



// This block saves the file we stores on Filestack in an attachment field in a separate 'test' table I created. Seems the file structure is correct.
let submissionsTable = base.getTable('test');
let attachmentField = submissionsTable.getField('Attachments');
let record = "rec0FOzqVsOV52cD9";
await submissionsTable.updateRecordAsync(record, {
    'Attachments':[{
                url: respJSON1['url']
            }]
});


//This is whers I'm stuck.
// (1) Not sure if file is formatted correctly. OpenAI has a nifty tool for checking format in CLI, but I don't know if it exists as an endpoint.
// (2) Not sure if call is formatted correctly. Still need to test this with a correctly formatted file to get this working.
let response2 = await remoteFetchAsync('https://api.openai.com/v1/files', {
  method: 'POST',
  headers: {
    'Content-Type' : 'multipart/form-data',
    'Authorization' : `Bearer ${API_KEY}`
  },
  data: JSON.stringify({
      'purpose': 'fine-tune',
      'file': respJSON1
  })
})

let respJSON2 = await response2.json();

output.text(JSON.stringify(respJSON2));

//One we can get the file created, next will be sending it to the fine-tunes endpoint, which will go below here.
