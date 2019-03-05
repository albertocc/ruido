// const on = document.querySelector('.on')

// on.addEventListener('click', () => {
//     console.log(autoFilter)
//     autoFilter.start()
// })

// const play = document.querySelector('.play')
const canvas = document.querySelector('#canvas')

const w = window.innerWidth
const h = window.innerHeight
canvas.width = w/8
canvas.height = h/8

canvas.addEventListener('click', () => {
    noise.state === 'stopped' ? fondo('play') : fondo('stop')
})

//initialize the noise and start
var noise = new Tone.Noise('brown')

//make an autofilter to shape the noise
// var autoFilter = new Tone.AutoFilter({
//     'frequency': '8m',
//     'min': 800,
//     'max': 15000
// }).connect(Tone.Master)

//connect the noise
// noise.connect(autoFilter)
noise.connect(Tone.Master)
//start the autofilter LFO

// fondo

let request;

const fondo = (state) => {
    if (state === 'play') {
        // document.body.requestFullscreen()
        let ctx = canvas.getContext('2d')
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        let p = ctx.getImageData(0, 0, canvas.width, canvas.height)
        requestAnimationFrame(function draw() {
            for (var i = 0; i < p.data.length; i++) {
                p.data[i++] = p.data[i++] = p.data[i++] = Math.random() * 255
            }
            ctx.putImageData(p, 0, 0)
            request = requestAnimationFrame(draw)
        })
        // noise.start()
    } else if (state === 'stop') {
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // noise.stop()
        cancelAnimationFrame(request)
    }
}

fondo('play')
