// import { config } from './config.js'

// Unsplash API
const count = 10
const apiKey = config.PUBLIC_KEY
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Get photos from Unsplashed usin API 

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        const jsonData = await response.json()
        console.log(jsonData)
    } catch (error) {
        // error here
    }
}

// On load
getPhotos()