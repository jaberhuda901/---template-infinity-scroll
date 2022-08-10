const imageContainer = document.getElementById("image-container")
const loaderhtml = document.getElementById("loader")

// performance improvement changes after review
let initialLoad = true

// Unsplash API
let photosArray = []
let ready = false
let imgLoaded = 0
let totalImg = 0
const count = 7
const apiKey = config.PUBLIC_KEY
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Get photos from Unsplashed usin API 

// Cheak if all img were loaded
function imageLoaded() {
    imgLoaded++
    if (imgLoaded === totalImg) {
        ready = true
        loaderhtml.hidden = true
        initialLoad = false
        count = 20
    }
}
// Helper to set atribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// create function for display
function displayPhotos() {
    imgLoaded = 0
    totalImg = photosArray.length
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
        // Add an event listener to shen each phoo is finished loading
        imgTag.addEventListener("load", imageLoaded)
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

// Cheak to see if scrolling near bottom of page to LOad more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
});

// On load
getPhotos()