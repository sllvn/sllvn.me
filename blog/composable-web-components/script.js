class GameOfLife extends HTMLElement {
  grid = []
  interval = null
  size = 25
  speed = 100

  static get observedAttributes() {
    return ['size', 'speed', 'data-configurable']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return

    if (name === 'size') {
      this.size = parseInt(newValue) || 25
      // Update SVG viewBox to match new size
      const svg = this.querySelector('svg')
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${this.size} ${this.size}`)
      }
      if (this.grid.length) {
        this.seed()
        this.render()
      }
    } else if (name === 'speed') {
      // Invert and scale the speed value - higher number means faster animation
      // Divide by 3 to make everything ~3x faster
      this.speed = (1000 - (parseInt(newValue) || 100)) / 5
      if (this.interval) {
        clearInterval(this.interval)
        this.play()
      }
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <svg viewBox="0 0 ${this.size} ${this.size}" />
      <button>Play</button>
    `

    this.button = this.querySelector('button')
    this.button.addEventListener('click', this.startStop)

    // Get initial values from attributes
    this.size = parseInt(this.getAttribute('size')) || this.size
    // Invert initial speed value and scale
    const speedValue = parseInt(this.getAttribute('speed')) || this.speed
    this.speed = (1000 - speedValue) / 3

    this.seed()
    this.render()
  }

  play = (e) => {
    this.interval = setInterval(() => {
      this.tick()
      requestAnimationFrame(this.render)
    }, this.speed)
  }

  startStop = () => {
    if (this.interval) {
      this.button.innerHTML = 'Play'
      clearInterval(this.interval)
      this.interval = null
    } else {
      this.button.innerHTML = 'Pause'
      this.play()
    }
  }

  render = () => {
    const svg = this.querySelector('svg')
    svg.innerHTML = ''
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.grid[x][y]) {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
          rect.setAttribute('x', x)
          rect.setAttribute('y', y)
          rect.setAttribute('width', 1)
          rect.setAttribute('height', 1)
          rect.setAttribute('fill', 'var(--primary)')
          svg.appendChild(rect)
        }
      }
    }
  }

  seed = () => {
    for (let x = 0; x < this.size; x++) {
      this.grid[x] = []
      for (let y = 0; y < this.size; y++) {
        this.grid[x][y] = Math.random() > 0.7
      }
    }
  }

  tick = () => {
    const next = []
    for (let x = 0; x < this.size; x++) {
      next[x] = []
      for (let y = 0; y < this.size; y++) {
        const neighbours = this.getNeighbours(x, y)
        if (this.grid[x][y]) {
          next[x][y] = neighbours === 2 || neighbours === 3
        } else {
          next[x][y] = neighbours === 3
        }
      }
    }
    this.grid = next
  }

  getNeighbours = (x, y) => {
    let neighbours = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) {
          const neighbourX = x + i
          const neighbourY = y + j
          if (neighbourX >= 0 && neighbourX < this.size && neighbourY >= 0 && neighbourY < this.size) {
            neighbours += this.grid[neighbourX][neighbourY]
          }
        }
      }
    }
    return neighbours
  }
}

class GameConfig extends HTMLElement {
  connectedCallback() {
    // Wait for child elements to be available
    requestAnimationFrame(() => {
      const game = this.querySelector('[data-configurable]')
      if (!game) return

      const speedInput = this.querySelector('input[name="speed"]')
      const sizeInput = this.querySelector('input[name="size"]')

      if (speedInput) {
        // Set initial value
        game.setAttribute('speed', speedInput.value)

        speedInput.addEventListener('input', (e) => {
          game.setAttribute('speed', e.target.value)
        })
      }

      if (sizeInput) {
        // Set initial value
        game.setAttribute('size', sizeInput.value)

        sizeInput.addEventListener('input', (e) => {
          game.setAttribute('size', e.target.value)
        })
      }
    })
  }
}

window.customElements.define('game-of-life', GameOfLife)
window.customElements.define('game-config', GameConfig)
