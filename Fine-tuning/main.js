import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

/* Upload training data from our motivational coach */ 
// const response = await fetch('/data.jsonl');
// const dataText = await response.text(); // Parse the response to get the text data

// // Create a File object from the fetched data
// const dataFile = new File([dataText], "data.jsonl", { type: "application/jsonl" });

// const fileID = await openai.files.create({
//     file: dataFile, 
//     purpose: 'fine-tune'
// })
// console.log("fileID: ", fileID)
// // file-QxBP3GKvDO7OXsIhI98BhGsn

// /* Use file ID to create job */
// const fineTune = await openai.fineTuning.jobs.create({
//     training_file: fileID.id,
//     model: 'gpt-3.5-turbo'
// })
// console.log("fineTune ",fineTune)
// // ftjob-AYwT11cpY2sLIaRbs3llYkX4"

// /* Check status of job need to wait whil fine tunig finishes and then get fine_tuned_model name*/
// const fineTuneStatus = await openai.fineTuning.jobs.retrieve(fineTune.id)
// console.log("fineTuneStatus: ",fineTuneStatus.status)
//{object: "fine_tuning.job", id: "ftjob-AYwT11cpY2sLIaRbs3llYkX4", model: "gpt-3.5-turbo-0125", created_at: 1711377650, finished_at: 1711378224, fine_tuned_model: "ft:gpt-3.5-turbo-0125:scrimba::96fwXrQX", organization_id: "org-hILmMJhWE2V3rB3oGuJuRWMy", result_files: ["file-dmhvhRjM6S4hl55XWj2Q2kbx"], status: "succeeded", validation_file: null, training_file: "file-QxBP3GKvDO7OXsIhI98BhGsn", hyperparameters: {n_epochs: 3, batch_size: 1, learning_rate_multiplier: 2}, trained_tokens: 13017, error: {error: null}, user_provided_suffix: null}


/* Test our fine-tuned model */ 
const messages = [{
    role: 'user',
    content: "I don't know how to balance work and life."
}]
async function getResponse() {
   const response = await openai.chat.completions.create({
       model: 'ft:gpt-3.5-turbo-0125:personal::9OnLJ2cX', //fine-tuned model name
       messages: messages
   })
   return response.choices[0].message.content
}
console.log("getResponse(): ",await getResponse())

