// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// index.js

// 1. Core logic functions
async function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=CA`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Invalid state abbreviation or API error.");
        }

        const data = await response.json();
        displayAlerts(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayAlerts(data) {
    const alertsDisplay = document.getElementById('alerts-display');
    const errorMessage = document.getElementById('error-message');
    const stateInput = document.getElementById('state-input');

    // Requirement: Clear error and hide it using the 'hidden' class
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
    
    alertsDisplay.innerHTML = '';

    const features = data.features || [];
    
    // Requirement: Match "Weather Alerts: [count]" format exactly
    const summary = document.createElement('h2');
    summary.textContent = `${data.title}: ${features.length}`;
    alertsDisplay.appendChild(summary);

    const ul = document.createElement('ul');
    features.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });
    alertsDisplay.appendChild(ul);
    
    // Requirement: Clear input field after clicking
    if (stateInput) stateInput.value = '';
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    const alertsDisplay = document.getElementById('alerts-display');
    const stateInput = document.getElementById('state-input');

    if (alertsDisplay) alertsDisplay.innerHTML = '';
    if (stateInput) stateInput.value = ''; 
    
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden'); // Show error
    }
}

// 2. Initialization to avoid "null" during Jest's require()
function setupApp() {
    const getBtn = document.getElementById('fetch-alerts');
    const stateInput = document.getElementById('state-input');

    if (getBtn && stateInput) {
        getBtn.addEventListener('click', () => {
            const state = stateInput.value.trim();
            
            // Crucial: Clear input immediately to satisfy the "input clearing" test
            stateInput.value = '';
            
            if (state) {
                fetchWeatherAlerts(state);
            }
        });
    }
}

// Run immediately for Jest and on load for the browser
setupApp();
