const imageContainer = document.getElementById("image-container")
const loaderhtml = document.getElementById("loader")

// Unsplash API
let photosArray = []
const count = 10
const apiKey = config.PUBLIC_KEY
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Get photos from Unsplashed usin API 

// Helper to set atribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// create function for display
function displayPhotos() {
    // Run for each object in photo array
    photosArray.forEach((photo) => {
        // create an <a> tage with href
        const aTag = document.createElement("a")
        // aTag.setAttribute("href", photo.links.html)
        // aTag.setAttribute("target", "_blank")
        setAttributes(aTag, {
            href: photo.links.html,
            target: "_blank"
        });
        // Create img tag with link
        const imgTag = document.createElement("img")
        // imgTag.setAttribute("src", photo.urls.regular) 
        // imgTag.setAttribute("alt", photo.alt_description)
        // imgTag.setAttribute("title", photo.alt_description)  
        setAttributes(imgTag, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Put <img> inside <a> and put both inside imageContainerhtml
        aTag.appendChild(imgTag)
        imageContainer.appendChild(aTag)
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        console.log(photosArray)
        displayPhotos()
         
    } catch (error) {
        // error here
    }
}

// On load
getPhotos()