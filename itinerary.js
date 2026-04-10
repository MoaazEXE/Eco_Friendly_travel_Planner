// 1. Mock Data
const mockDestinations = [
    { id: 1, city: "kl", name: "KLCC Park & Eco-Walk", type: "nature", budget: 0, weather: "Sunny", impact: "Low" },
    { id: 2, city: "kl", name: "Pasar Seni Heritage Trail", type: "culture", budget: 20, weather: "Cloudy", impact: "High" },
    { id: 3, city: "kl", name: "Bangsar Organic Community Garden", type: "nature", budget: 10, weather: "Sunny", impact: "Low" },
    { id: 4, city: "kl", name: "The Hive Bulk Foods (Bangsar)", type: "food", budget: 50, weather: "Cool", impact: "Medium" },
    { id: 5, city: "penang", name: "Entopia Butterfly Farm", type: "nature", budget: 60, weather: "Sunny", impact: "Low" },
    { id: 6, city: "penang", name: "George Town Cycling Tour", type: "cycling", budget: 30, weather: "Cloudy", impact: "Low" },
    { id: 7, city: "penang", name: "Hin Bus Depot Arts Space", type: "culture", budget: 0, weather: "Cool", impact: "Low" }
];

// 2. State Management
let mySavedPlan = [];

// 3. Setup after DOM Loads
document.addEventListener('DOMContentLoaded', () => {
    const budgetRange = document.getElementById('budgetRange');
    const budgetDisplay = document.getElementById('budgetDisplay');
    const itineraryForm = document.getElementById('itineraryForm');

    // Handle Slider Green Fill and Text update
    if (budgetRange) {
        budgetRange.addEventListener('input', (e) => {
            const value = e.target.value;
            budgetDisplay.textContent = `RM ${value}`;
            
            const min = e.target.min || 0;
            const max = e.target.max || 1000;
            const percent = ((value - min) / (max - min)) * 100;
            
            e.target.style.background = `linear-gradient(to right, #198754 0%, #198754 ${percent}%, #dee2e6 ${percent}%, #dee2e6 100%)`;
        });
    }

    if (itineraryForm) {
        itineraryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            generateSuggestions();
        });
    }
});

// --- Logic Functions ---

function generateSuggestions() {
    const userInputCity = document.getElementById('destination').value.toLowerCase().trim();
    const selectedWeather = document.querySelector('input[name="weather"]:checked').value;
    const maxBudget = document.getElementById('budgetRange').value;

    const selectedCheckboxes = document.querySelectorAll('#interestGroup input[type="checkbox"]:checked');
    const selectedInterests = Array.from(selectedCheckboxes).map(cb => cb.value);

    const container = document.getElementById('recommendationContainer');
    container.innerHTML = ""; 

    const filtered = mockDestinations.filter(item => {
        const cityMatch = item.city === userInputCity;
        const budgetMatch = item.budget <= maxBudget;
        const weatherMatch = item.weather === selectedWeather;
        const interestMatch = selectedInterests.includes(item.type);
        return cityMatch && budgetMatch && weatherMatch && interestMatch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border-2 text-center p-4 rounded-4 shadow-sm">
                    <h6 class="fw-bold text-dark">No matching spots found.</h6>
                    <p class="small text-muted mb-0">Try different interests or a higher budget!</p>
                </div>
            </div>`;
        return;
    }

    filtered.forEach(item => {
        let impactColor = item.impact === "Medium" ? "warning" : (item.impact === "High" ? "danger" : "success");

        container.innerHTML += `
            <div class="col-12 mb-3">
                <div class="card border-0 shadow-sm rounded-4 border-start border-success border-5">
                    <div class="card-body p-4 d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge bg-${impactColor}-subtle text-${impactColor} fw-bold text-uppercase mb-2" style="font-size: 0.7rem;">${item.impact} Impact</span>
                            <h5 class="fw-bold mb-1">${item.name}</h5>
                            <p class="small text-muted mb-0">RM${item.budget} | ${item.weather} Weather</p>
                        </div>
                        <button class="btn btn-success rounded-pill px-4 fw-bold" onclick="addToPlan(${item.id})">
                            Add <i class="bi bi-plus-lg ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

function addToPlan(id) {
    const travelDate = document.getElementById('travelDate').value;
    
    // 1. Validate date FIRST
    if (!travelDate) {
        alert("Please select a date in the form first!");
        document.getElementById('travelDate').focus();
        return;
    }

    // 2. Find the item
    const originalItem = mockDestinations.find(item => item.id === id);
    
    // 3. Check if ALREADY added for that specific date to prevent duplicates
    const isDuplicate = mySavedPlan.some(plan => plan.id === id && plan.plannedDate === travelDate);
    
    if (!isDuplicate) {
        // Create new object with date attached
        const itemToAdd = { ...originalItem, plannedDate: travelDate };
        mySavedPlan.push(itemToAdd);
        
        // 4. Sort chronologically
        mySavedPlan.sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
        
        renderSavedPlan();
    } else {
        alert("This activity is already in your plan for this date!");
    }
}

function renderSavedPlan() {
    const list = document.getElementById('savedPlanList');
    
    if (mySavedPlan.length === 0) {
        list.innerHTML = `<div class="text-center py-4"><p class="text-muted mb-0">Your itinerary is empty.</p></div>`;
        return;
    }

    list.innerHTML = ""; 
    mySavedPlan.forEach((item, index) => {
        const dateObj = new Date(item.plannedDate);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        let impactColor = item.impact === "Medium" ? "warning" : (item.impact === "High" ? "danger" : "success");

        list.innerHTML += `
            <div class="saved-item-card mb-4">
                <div class="date-badge mb-2">
                    <i class="bi bi-calendar-check me-1"></i> ${formattedDate}
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="icon-box me-3">
                            <i class="bi bi-pin-map-fill"></i>
                        </div>
                        <div class="item-info">
                            <h6 class="fw-bold mb-0">${item.name}</h6>
                            <div class="item-meta">
                                <span class="badge bg-${impactColor}-subtle text-${impactColor} me-2">${item.impact} Impact</span>
                                <span class="small text-muted">RM${item.budget}</span>
                            </div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="removeFromPlan(${index})">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>`;
    });
}

function removeFromPlan(index) {
    mySavedPlan.splice(index, 1);
    renderSavedPlan();
}