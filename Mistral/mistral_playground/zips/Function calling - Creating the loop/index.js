import MistralClient from '@mistralai/mistralai';
import { tools, getPaymentDate, getPaymentStatus } from "./tools.js";
const client = new MistralClient(process.env.MISTRAL_API_KEY);

const availableFunctions = {
    getPaymentDate,
    getPaymentStatus
};

async function agent(query) {
    const messages = [
        { role: "user", content: query }
    ];
    
    // Challenge:
    // Create a for loop that runs a maximum of 5 times
    
    for (let i = 0; i < 5; i++) {
        const response = await client.chat( {
            model: 'mistral-large-latest',
            messages: messages,
            tools: tools
        });
        
        messages.push(response.choices[0].message);

        // if the finishReason is 'stop', then simply return the 
        // response from the assistant
        if (response.choices[0].finish_reason === 'stop') {
            return response.choices[0].message.content;
        } else if (response.choices[0].finish_reason === 'tool_calls') {
            const functionObject = response.choices[0].message.tool_calls[0].function;
            const functionName = functionObject.name;
            const functionArgs = JSON.parse(functionObject.arguments);
            const functionResponse = availableFunctions[functionName](functionArgs);
            messages.push({
                role: 'tool',
                name: functionName,
                content: functionResponse 
            });
        }
    }
}

const response = await agent("when was the transaction T1001 paid?");
console.log(response);