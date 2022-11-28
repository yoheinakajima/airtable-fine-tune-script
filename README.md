# airtable-fine-tune-script
Script for fine-tuning GPT-3 from Airtable.

#CURRENTLY INCOMPLETE
I think I have the data format pretty close, but got stuck at creating the file from the OpenAI with the https://beta.openai.com/docs/api-reference/files/ end point from Javascript.
(1) Unsure if data is cleaned up propertly, couldn't figure out how to check file format.
(2) Unsure if API call to the files endpoint is structured correctly.

#NEXT STEPS
(1) First fix the above
(2) Once file is created, send to fine-tunes endpoint to create the new model.
(3) Store data from the new model (eg. name) in Airtable.
