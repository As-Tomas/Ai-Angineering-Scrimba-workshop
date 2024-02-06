export async function getCurrentWeather({ location, unit = "fahrenheit" }) {
    console.log("location:", location)
    console.log("unit:", unit)
    const weather = {
        location,
        temperature: "75",
        unit,
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}

export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const text = await response.json()
        return JSON.stringify(text)
      } catch (err) {
        console.log(err)
      }
}

//! in openai beta we do not use tools we define as functions
export const tools =[
    {
        type: "function",
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The location from where to get the weather"
                    }
                },
                required: ["location"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "getLocation",
            description: "Get the user's current location",
            parameters: {
                type: "object",
                properties: {}
            }
        }
    },
]

export const functions = [
    {
        function: getCurrentWeather,
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The location from where to get the weather"
                }
            },
            required: ["location"]
        }
    },
    {
        function: getLocation,
        parameters: {
            type: "object",
            properties: {}
        }
    },
]