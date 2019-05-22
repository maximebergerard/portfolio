const background = document.querySelector('body')
const image = document.querySelector('.image')

const lazyElements = [...document.querySelectorAll('.lazy')]

for(const lazy of lazyElements)
{
    const image = document.createElement('img')
    image.addEventListener('load', () =>
    {
        lazy.classList.add('loaded')
        lazy.style.backgroundImage = `url(${image.src})`
    })
    image.src = lazy.dataset.src
    console.log(image.src);
    
}


/**
 * Sizes
 */
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

window.addEventListener('resize', () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    // Update background page
    background.style.width = windowWidth
    background.style.height = windowHeight
})


