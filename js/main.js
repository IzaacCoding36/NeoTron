const subtrair = document.querySelector("#subtrair")
const somar = document.querySelector("#somar")
const braco = document.querySelector("#braco")

const controle = document.querySelectorAll("[data-controle]")
const estatisticas = document.querySelectorAll("[data-estatistica]")
const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos": {
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas": {
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes": {
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

controle.forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
        manipulaDados(evento.target.dataset.controle, evento.target.parentNode)
        atualizaEstatisticas(evento.target.dataset.controle, evento.target.dataset.peca)
        
        // Add visual feedback
        evento.target.style.transform = 'scale(0.9)';
        setTimeout(() => {
            evento.target.style.transform = '';
        }, 100);
        
        // Play click sound effect
        playClickSound();
    })
})

function manipulaDados(operacao, controle) {
    const peca = controle.querySelector("[data-contador]")
    if (operacao === "-") {
        peca.value = parseInt(peca.value) - 1
    } else {
        peca.value = parseInt(peca.value) + 1
    }
}

function atualizaEstatisticas(operacao, peca) {
    estatisticas.forEach((elemento) => {
        if (operacao === "-") {
            elemento.textContent = parseInt(elemento.textContent) - pecas[peca][elemento.dataset.estatistica]
        } else {
            elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica]
        }
    })
}

function changeColor(color) {
    let newRobot = document.createElement("img")
    let area = document.querySelector(".robotron")
    let robo = document.querySelector("#robotron")

    newRobot.src = `./img/cores/${color}.png`
    robo.remove()
    newRobot.classList.add("robo")
    newRobot.setAttribute("id", "robotron")
    area.appendChild(newRobot)
    
    // Add visual feedback for color change
    area.style.transform = 'scale(1.05)';
    setTimeout(() => {
        area.style.transform = '';
    }, 200);
    
    // Play color change sound
    playClickSound();
}

// Sound effects
function playClickSound() {
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Enhanced production completion
function completeProduction() {
    // Create a more engaging completion experience
    const modal = document.createElement('div');
    modal.className = 'production-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>🤖 Robô Produzido com Sucesso! 🤖</h2>
            <p>Seu NeoTron 3000 está pronto para ação!</p>
            <div class="stats-summary">
                <div class="stat-item">
                    <span class="stat-label">Força:</span>
                    <span class="stat-value">${document.querySelector('[data-estatistica="forca"]').textContent}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Poder:</span>
                    <span class="stat-value">${document.querySelector('[data-estatistica="poder"]').textContent}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Energia:</span>
                    <span class="stat-value">${document.querySelector('[data-estatistica="energia"]').textContent}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Velocidade:</span>
                    <span class="stat-value">${document.querySelector('[data-estatistica="velocidade"]').textContent}</span>
                </div>
            </div>
            <button class="close-modal" onclick="closeProductionModal()">Continuar Produzindo</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add celebration effect
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Play success sound
    playSuccessSound();
}

function closeProductionModal() {
    const modal = document.querySelector('.production-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play a success chord
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + 0.5 + index * 0.1);
    });
}

// Keyboard shortcuts for better accessibility
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    switch(key) {
        case '1':
            changeColor('amarelo');
            break;
        case '2':
            changeColor('azul');
            break;
        case '3':
            changeColor('branco');
            break;
        case '4':
            changeColor('preto');
            break;
        case '5':
            changeColor('rosa');
            break;
        case '6':
            changeColor('vermelho');
            break;
        case 'enter':
            event.preventDefault();
            completeProduction();
            break;
        case 'h':
            event.preventDefault();
            toggleHelp();
            break;
        case 'escape':
            const modal = document.querySelector('.production-modal');
            const helpOverlay = document.querySelector('.help-overlay');
            if (modal) closeProductionModal();
            if (helpOverlay && helpOverlay.classList.contains('show')) toggleHelp();
            break;
    }
});

// Help overlay functionality
function toggleHelp() {
    const helpOverlay = document.getElementById('helpOverlay');
    helpOverlay.classList.toggle('show');
}

// Show help on first visit
window.addEventListener('load', () => {
    if (!localStorage.getItem('neoTronHelpShown')) {
        setTimeout(() => {
            toggleHelp();
            localStorage.setItem('neoTronHelpShown', 'true');
        }, 2000);
    }
});

// Background music with user interaction handling
const audio = new Audio('./som/NeoTron3000.mp3');
audio.loop = true;
audio.volume = 0.6;

let audioStarted = false;

// Try to play audio immediately, if fails, wait for user interaction
function startBackgroundMusic() {
    if (!audioStarted) {
        audio.play().then(() => {
            audioStarted = true;
            console.log("Background music started successfully");
        }).catch(error => {
            console.log("Audio autoplay blocked, waiting for user interaction:", error);
        });
    }
}

// Auto-start music on page load
startBackgroundMusic();

// Start music on any user interaction if not already started
function enableAudioOnInteraction() {
    if (!audioStarted) {
        startBackgroundMusic();
        // Remove event listeners after first interaction
        document.removeEventListener('click', enableAudioOnInteraction);
        document.removeEventListener('keydown', enableAudioOnInteraction);
        document.removeEventListener('touchstart', enableAudioOnInteraction);
    }
}

// Add event listeners for user interaction
document.addEventListener('click', enableAudioOnInteraction);
document.addEventListener('keydown', enableAudioOnInteraction);
document.addEventListener('touchstart', enableAudioOnInteraction);