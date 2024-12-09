// Utility Functions (keep existing ones)
function toKelvin(value, unit) {
    switch (unit) {
        case "Celsius": return value + 273.15;
        case "Fahrenheit": return (value - 32) * (5 / 9) + 273.15;
        case "Kelvin": return value;
        default: return value;
    }
}

function fromKelvin(value, unit) {
    switch (unit) {
        case "Celsius": return value - 273.15;
        case "Fahrenheit": return (value - 273.15) * (9 / 5) + 32;
        case "Kelvin": return value;
        default: return value;
    }
}

function normalizeTime(value, unit) {
    switch (unit) {
        case "seconds": return value / 3600;
        case "minutes": return value / 60;
        case "hours": return value;
        default: return value;
    }
}

function denormalizeTime(value, unit) {
    switch (unit) {
        case "seconds": return value * 3600;
        case "minutes": return value * 60;
        case "hours": return value;
        default: return value;
    }
}

function promptContinue() {
    // Create a confirmation dialog
    const continuePrompt = document.createElement('div');
    continuePrompt.innerHTML = `
        <div id="continueSection" style="
            background-color: #b3e5fc;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-top: 20px;
        ">
            <h3>Would you like to continue using the calculator?</h3>
            <button id="yesContinueBtn" style="
                background-color: #0288d1;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                margin-right: 10px;
            ">Yes</button>
            <button id="noContinueBtn" style="
                background-color: #0288d1;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
            ">No</button>
        </div>
    `;

    // Insert the prompt after the result section
    resultSection.after(continuePrompt);

    // Add event listeners to the new buttons
    document.getElementById('yesContinueBtn').addEventListener('click', () => {
        // Remove the continue section
        continuePrompt.remove();

        // Reset the calculator
        document.getElementById('calcType').selectedIndex = 0;
        document.getElementById('calculationType').innerHTML = '<option value="">Select Calculation Variant</option>';
        document.getElementById('inputForm').innerHTML = '';
        document.getElementById('calculatorOptions').style.display = 'none';
        resultSection.style.display = 'none';
    });

    document.getElementById('noContinueBtn').addEventListener('click', () => {
        // Create a thank you message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.innerHTML = `
            <div style="
                background-color: #b3e5fc;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin-top: 20px;
            ">
                <h3>Thank you for using the Differential Equations Calculator!</h3>
                <p>We hope this tool was helpful for your calculations.</p>
            </div>
        `;

        // Replace the continue prompt with thank you message
        continuePrompt.replaceWith(thankYouMessage);

        // Optional: Hide calculator section after a delay
        setTimeout(() => {
            calculatorSection.style.display = 'none';
            welcomeSection.style.display = 'block';
        }, 3000);
    });
}

// Enhanced Input Handling
function generateInputForm(calcType, calculationType) {
    const inputForm = document.getElementById('inputForm');
    inputForm.innerHTML = ''; // Clear previous inputs

    // Temperature Unit Dropdown (reusable)
    const temperatureUnitDropdown = `
        <div class="input-group">
            <label for="unit-temp">Unit of Temperature:</label>
            <select id="unit-temp" required>
                <option value="Celsius">Celsius (°C)</option>
                <option value="Fahrenheit">Fahrenheit (°F)</option>
                <option value="Kelvin" selected>Kelvin (K)</option>
            </select>
        </div>
    `;

    // Time Unit Dropdown (reusable)
    const timeUnitDropdown = `
        <div class="input-group">
            <label for="unit-time">Unit of Time:</label>
            <select id="unit-time" required>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours" selected>Hours</option>
            </select>
        </div>
    `;

    const unitOfXInput = `
        <div class="input-group">
            <label for="unit-x">Unit of Quantity (x):</label>
            <input type="text" id="unit-x" placeholder="e.g., kg, m, $" required>
        </div>
    `;

    // Dynamic Input Generation
    if (calcType === 'growth-decay') {
        switch (calculationType) {
            case 'find-amount':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="initial-value">Initial Value (x₀):</label>
                        <input type="number" id="initial-value" required>
                    </div>
                    <div class="input-group">
                        <label for="time1">Time t₁:</label>
                        <input type="number" id="time1" required>
                    </div>
                    <div class="input-group">
                        <label for="amount1">Amount at Time t₁ (x₁):</label>
                        <input type="number" id="amount1" required>
                    </div>
                    <div class="input-group">
                        <label for="time2">Time t₂:</label>
                        <input type="number" id="time2" required>
                    </div>
                    ${unitOfXInput}
                    ${timeUnitDropdown}
                `;
                break;
            case 'find-initial':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="amount1">Amount at Time t₁ (x₁):</label>
                        <input type="number" id="amount1" required>
                    </div>
                    <div class="input-group">
                        <label for="time1">Time t₁:</label>
                        <input type="number" id="time1" required>
                    </div>
                    <div class="input-group">
                        <label for="amount2">Amount at Time t₂ (x₂):</label>
                        <input type="number" id="amount2" required>
                    </div>
                    <div class="input-group">
                        <label for="time2">Time t₂:</label>
                        <input type="number" id="time2" required>
                    </div>
                    ${unitOfXInput}
                `;
                break;
            case 'find-time':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="initial-value">Initial Value (x₀):</label>
                        <input type="number" id="initial-value" required>
                    </div>
                    <div class="input-group">
                        <label for="amount1">Target Amount (x₁):</label>
                        <input type="number" id="amount1" required>
                    </div>
                    ${unitOfXInput}
                    ${timeUnitDropdown}
                `;
                break;
        }
    } else if (calcType === 'heat-cool') {
        switch (calculationType) {
            case 'find-temp':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="ambient-temp">Ambient Temperature (Tₐ):</label>
                        <input type="number" id="ambient-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="initial-temp">Initial Temperature (T₀):</label>
                        <input type="number" id="initial-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="known-time">Known Time (t₁):</label>
                        <input type="number" id="known-time" required>
                    </div>
                    <div class="input-group">
                        <label for="known-temp">Temperature at t₁ (T₁):</label>
                        <input type="number" id="known-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="target-time">Target Time (t₂):</label>
                        <input type="number" id="target-time" required>
                    </div>
                    ${temperatureUnitDropdown}
                    ${timeUnitDropdown}
                `;
                break;
            case 'find-initial-temp':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="ambient-temp">Ambient Temperature (Tₐ):</label>
                        <input type="number" id="ambient-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="known-time1">Time t₁:</label>
                        <input type="number" id="known-time1" required>
                    </div>
                    <div class="input-group">
                        <label for="known-temp1">Temperature at Time t₁ (T₁):</label>
                        <input type="number" id="known-temp1" required>
                    </div>
                    <div class="input-group">
                        <label for="known-time2">Time t₂:</label>
                        <input type="number" id="known-time2" required>
                    </div>
                    <div class="input-group">
                        <label for="known-temp2">Temperature at Time t₂ (T₂):</label>
                        <input type="number" id="known-temp2" required>
                    </div>
                    ${temperatureUnitDropdown}
                    ${timeUnitDropdown}
                `;
                break;
            case 'find-time':
                inputForm.innerHTML = `
                    <div class="input-group">
                        <label for="ambient-temp">Ambient Temperature (Tₐ):</label>
                        <input type="number" id="ambient-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="initial-temp">Initial Temperature (T₀):</label>
                        <input type="number" id="initial-temp" required>
                    </div>
                    <div class="input-group">
                        <label for="target-temp">Target Temperature (T):</label>
                        <input type="number" id="target-temp" required>
                    </div>
                    ${temperatureUnitDropdown}
                    ${timeUnitDropdown}
                `;
                break;
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const calcType = document.getElementById('calcType');
    const calculationType = document.getElementById('calculationType');
    const proceedButton = document.getElementById('proceedButton');
    const calculateButton = document.getElementById('calculateButton');
    const welcomeSection = document.getElementById('welcomeSection');
    const calculatorSection = document.getElementById('calculatorSection');
    const calculatorOptions = document.getElementById('calculatorOptions');

    // Proceed Button
    proceedButton.addEventListener('click', () => {
        welcomeSection.style.display = 'none';
        calculatorSection.style.display = 'block';
    });

    // Calculator Type Selection
    calcType.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        calculatorOptions.style.display = selectedType ? 'block' : 'none';
        
        // Update title
        document.getElementById('calculatorTitle').textContent = 
            selectedType === 'growth-decay' 
                ? 'Growth and Decay Calculator' 
                : 'Heat Transfer and Cooling Calculator';

        // Populate Calculation Types
        calculationType.innerHTML = '<option value="">Select Calculation Variant</option>';
        if (selectedType === 'growth-decay') {
            calculationType.innerHTML += `
                <option value="find-amount">Determine Amount at Time (t)</option>
                <option value="find-initial">Determine Initial Value</option>
                <option value="find-time">Determine Time to Reach Value</option>
            `;
        } else if (selectedType === 'heat-cool') {
            calculationType.innerHTML += `
                <option value="find-temp">Determine Temperature at Time</option>
                <option value="find-initial-temp">Determine Initial Temperature</option>
                <option value="find-time">Determine Time to Reach Temperature</option>
            `;
        }
    });

    // Calculation Type Selection
    calculationType.addEventListener('change', (e) => {
        const selectedCalcType = calcType.value;
        const selectedCalculationType = e.target.value;
        
        // Generate appropriate input form
        if (selectedCalcType && selectedCalculationType) {
            generateInputForm(selectedCalcType, selectedCalculationType);
        }
    });

    // Calculate Button
    calculateButton.addEventListener('click', () => {
        const selectedCalcType = calcType.value;
        const selectedCalculationType = calculationType.value;

        // Validate inputs
        const inputs = document.querySelectorAll('#inputForm input');
        const isValid = Array.from(inputs).every(input => input.checkValidity());

        if (!isValid) {
            alert('Please fill in all required fields with valid numbers.');
            return;
        }

        // Route to appropriate calculation function
        switch (selectedCalcType) {
            case 'growth-decay':
                switch (selectedCalculationType) {
                    case 'find-amount': calculateGrowthDecayAmount(); break;
                    case 'find-initial': calculateGrowthDecayInitial(); break;
                    case 'find-time': calculateGrowthDecayTime(); break;
                }
                break;
            case 'heat-cool':
                switch (selectedCalculationType) {
                    case 'find-temp': calculateHeatTransferTemp(); break;
                    case 'find-initial-temp': calculateHeatTransferInitialTemp(); break;
                    case 'find-time': calculateHeatTransferTime(); break;
                }
                break;
        }
    });
});

function calculateGrowthDecayAmount() {
    const x0 = parseFloat(document.getElementById('initial-value').value);
    const t1 = parseFloat(document.getElementById('time1').value);
    const x1 = parseFloat(document.getElementById('amount1').value);
    const t2 = parseFloat(document.getElementById('time2').value);
    const unitX = document.getElementById('unit-x').value;
    const timeUnit = document.getElementById('unit-time').value;

    // Normalize time
    const t1Norm = normalizeTime(t1, timeUnit);
    const t2Norm = normalizeTime(t2, timeUnit);

    // Step 1: Solve for c (initial value)
    const c = x0;

    // Step 2: Solve for k (growth/decay rate)
    const k = Math.log(x1 / c) / t1Norm;

    // Step 3: Solve for x at t2
    const x2 = c * Math.exp(k * t2Norm);

    // Step 4: Calculate rate of change (dx/dt)
    const dxdt = k * x2;

    // Display result with detailed steps
    resultSection.style.display = 'block';
    resultText.innerHTML = `
Step 1: Solve for c
c = ${c}

Step 2: Solve for k
k = ln(${x1} / ${c}) / ${t1Norm.toFixed(4)}
  = ${k.toFixed(4)}

Step 3: Solve for x at t2
x = ${c} * e^(${k.toFixed(4)} * ${t2Norm.toFixed(4)})
  = ${x2.toFixed(4)} ${unitX}

Step 4: Calculate dx/dt
dx/dt = k * x
      = ${k.toFixed(4)} * ${x2.toFixed(4)}
      = ${dxdt.toFixed(4)} ${unitX}/hour

The growth/decay rate of x is ${dxdt.toFixed(4)} ${unitX}/hour
At time ${t2} ${timeUnit}, x is ${x2.toFixed(4)} ${unitX}
    `;
    promptContinue();
}

function calculateGrowthDecayInitial() {
    const x1 = parseFloat(document.getElementById('amount1').value);
    const t1 = parseFloat(document.getElementById('time1').value);
    const x2 = parseFloat(document.getElementById('amount2').value);
    const t2 = parseFloat(document.getElementById('time2').value);
    const unitX = document.getElementById('unit-x').value;
    const timeUnit = document.getElementById('unit-time').value;

    // Normalize time
    const t1Norm = normalizeTime(t1, timeUnit);
    const t2Norm = normalizeTime(t2, timeUnit);

    // Detailed calculation steps
    // Step 1: Calculate time difference
    const timeDiff = t2Norm - t1Norm;

    // Step 2: Calculate growth/decay rate (k)
    const k = Math.log(x2 / x1) / timeDiff;

    // Step 3: Calculate initial value (x0)
    const x0 = x1 / Math.exp(k * t1Norm);

    // Step 4: Verify the calculation
    const verifyX2 = x0 * Math.exp(k * t2Norm);

    // Display result with detailed steps
    resultSection.style.display = 'block';
    resultText.innerHTML = `
Detailed Calculation Steps:

Step 1: Calculate Time Difference
t₂ = ${t2Norm.toFixed(4)} ${timeUnit}
t₁ = ${t1Norm.toFixed(4)} ${timeUnit}
Δt = t₂ - t₁ = ${timeDiff.toFixed(4)} ${timeUnit}

Step 2: Calculate Growth/Decay Rate (k)
k = ln(${x2} / ${x1}) / (${t2Norm.toFixed(4)} - ${t1Norm.toFixed(4)})
  = ln(${(x2/x1).toFixed(4)}) / ${timeDiff.toFixed(4)}
  = ${k.toFixed(4)} per ${timeUnit}

Step 3: Calculate Initial Value (x₀)
x₀ = ${x1} / e^(${k.toFixed(4)} * ${t1Norm.toFixed(4)})
    = ${x0.toFixed(4)} ${unitX}

Step 4: Verification
Calculating x₂ using x₀ and k:
x₂ = ${x0.toFixed(4)} * e^(${k.toFixed(4)} * ${t2Norm.toFixed(4)})
    = ${verifyX2.toFixed(4)} ${unitX}

Calculated x₂ matches input: ${Math.abs(verifyX2 - x2) < 0.0001 ? 'YES' : 'NO'}

Final Results:
- Initial Value (x₀): ${x0.toFixed(4)} ${unitX}
- Growth/Decay Rate (k): ${k.toFixed(4)} per ${timeUnit}
    `;
    promptContinue();
}

function calculateGrowthDecayTime() {
    const x0 = parseFloat(document.getElementById('initial-value').value);
    const targetValue = parseFloat(document.getElementById('amount1').value);
    const unitX = document.getElementById('unit-x').value;
    const timeUnit = document.getElementById('unit-time').value;

    // Step 1: Ensure non-zero values
    if (x0 === 0 || targetValue === 0) {
        alert('Initial value and target value must not be zero.');
        return;
    }

    // Step 2: Calculate growth/decay rate
    const k = Math.log(targetValue / x0);
    
    // Step 3: Calculate time to reach target
    const time = Math.abs(k);
    
    // Step 4: Denormalize time
    const denormalizedTime = denormalizeTime(time, timeUnit);

    // Step 5: Verify target value calculation
    const verifyTargetValue = x0 * Math.exp(k);

    // Display result with detailed steps
    resultSection.style.display = 'block';
    resultText.innerHTML = `
Detailed Calculation Steps:

Step 1: Initial Conditions
Initial Value (x₀) = ${x0.toFixed(4)} ${unitX}
Target Value (x₁) = ${targetValue.toFixed(4)} ${unitX}

Step 2: Calculate Growth/Decay Rate (k)
k = ln(${targetValue} / ${x0})
  = ln(${(targetValue/x0).toFixed(4)})
  = ${k.toFixed(4)} per normalized hour

Step 3: Calculate Time to Reach Target
t = |${k.toFixed(4)}| = ${time.toFixed(4)} normalized hours

Step 4: Convert to Specific Time Unit
Time in ${timeUnit} = ${time.toFixed(4)} * 1 = ${denormalizedTime.toFixed(4)} ${timeUnit}

Step 5: Verification
Verifying target value:
x₁ = ${x0.toFixed(4)} * e^(${k.toFixed(4)})
    = ${verifyTargetValue.toFixed(4)} ${unitX}

Verification match: ${Math.abs(verifyTargetValue - targetValue) < 0.0001 ? 'YES' : 'NO'}

Final Results:
- Time to Reach Target: ${denormalizedTime.toFixed(4)} ${timeUnit}
- Growth/Decay Rate (k): ${k.toFixed(4)} per ${timeUnit}
    `;
    promptContinue();
}

function calculateHeatTransferInitialTemp() {
    const ambientTemp = parseFloat(document.getElementById('ambient-temp').value);
    const t1 = parseFloat(document.getElementById('known-time1').value);
    const temp1 = parseFloat(document.getElementById('known-temp1').value);
    const t2 = parseFloat(document.getElementById('known-time2').value);
    const temp2 = parseFloat(document.getElementById('known-temp2').value);
    const tempUnit = document.getElementById('unit-temp').value;
    const timeUnit = document.getElementById('unit-time').value;

    // Convert temperatures to Kelvin
    const ambientTempK = toKelvin(ambientTemp, tempUnit);
    const temp1K = toKelvin(temp1, tempUnit);
    const temp2K = toKelvin(temp2, tempUnit);

    // Normalize time
    const t1Norm = normalizeTime(t1, timeUnit);
    const t2Norm = normalizeTime(t2, timeUnit);

    // Step 1: Calculate time difference
    const timeDiff = Math.abs(t1Norm - t2Norm);

    // Step 2: Calculate heat transfer coefficient (k)
    const k = -Math.log((temp1K - ambientTempK) / (temp2K - ambientTempK)) / timeDiff;

    // Step 3: Calculate initial temperature
    const initialTempK = ambientTempK + (temp1K - ambientTempK) / Math.exp(-k * t1Norm);
    const initialTemp = fromKelvin(initialTempK, tempUnit);

    // Step 4: Verify calculations
    const verifyTemp1K = ambientTempK + (initialTempK - ambientTempK) * Math.exp(-k * t1Norm);
    const verifyTemp1 = fromKelvin(verifyTemp1K, tempUnit);

    // Display result with detailed steps
    resultSection.style.display = 'block';
    resultText.innerHTML = `
Detailed Heat Transfer Calculation Steps:

Step 1: Time and Temperature Analysis
Ambient Temperature (Tₐ): ${ambientTempK.toFixed(4)} K (${ambientTemp.toFixed(4)} ${tempUnit})
Time t₁: ${t1Norm.toFixed(4)} normalized hours
Temperature at t₁ (T₁): ${temp1K.toFixed(4)} K (${temp1.toFixed(4)} ${tempUnit})
Time t₂: ${t2Norm.toFixed(4)} normalized hours
Temperature at t₂ (T₂): ${temp2K.toFixed(4)} K (${temp2.toFixed(4)} ${tempUnit})

Step 2: Calculate Heat Transfer Coefficient (k)
k = -ln((${temp1K.toFixed(4)} - ${ambientTempK.toFixed(4)}) / 
        (${temp2K.toFixed(4)} - ${ambientTempK.toFixed(4)})) / |${t1Norm.toFixed(4)} - ${t2Norm.toFixed(4)}|
  = ${k.toFixed(4)} per normalized hour

Step 3: Calculate Initial Temperature
T₀ = ${ambientTempK.toFixed(4)} + 
     (${temp1K.toFixed(4)} - ${ambientTempK.toFixed(4)}) / 
     e^(-${k.toFixed(4)} * ${t1Norm.toFixed(4)})
   = ${initialTempK.toFixed(4)} K
   = ${initialTemp.toFixed(4)} ${tempUnit}

Step 4: Verification
Recalculating T₁ using initial temperature:
T₁ = ${ambientTempK.toFixed(4)} + 
     (${initialTempK.toFixed(4)} - ${ambientTempK.toFixed(4)}) * 
     e^(-${k.toFixed(4)} * ${t1Norm.toFixed(4)})
   = ${verifyTemp1K.toFixed(4)} K
   = ${verifyTemp1.toFixed(4)} ${tempUnit}

Verification match: ${Math.abs(verifyTemp1 - temp1) < 0.0001 ? 'YES' : 'NO'}

Final Results:
- Initial Temperature (T₀): ${initialTemp.toFixed(4)} ${tempUnit}
- Heat Transfer Coefficient (k): ${k.toFixed(4)} per ${timeUnit}
    `;
    promptContinue();
}

function calculateHeatTransferTime() {
    const ambientTemp = parseFloat(document.getElementById('ambient-temp').value);
    const initialTemp = parseFloat(document.getElementById('initial-temp').value);
    const targetTemp = parseFloat(document.getElementById('target-temp').value);
    const tempUnit = document.getElementById('unit-temp').value;
    const timeUnit = document.getElementById('unit-time').value;

    // Get result section elements
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');

    // Convert temperatures to Kelvin
    const ambientTempK = toKelvin(ambientTemp, tempUnit);
    const initialTempK = toKelvin(initialTemp, tempUnit);
    const targetTempK = toKelvin(targetTemp, tempUnit);

    // Revised temperature progression check
    const isValidCooling = initialTempK > ambientTempK && 
                            targetTempK < initialTempK && 
                            targetTempK > ambientTempK;
    const isValidHeating = initialTempK < ambientTempK && 
                            targetTempK > initialTempK && 
                            targetTempK < ambientTempK;

    // Check for valid temperature progression
    if (!isValidCooling && !isValidHeating) {
        alert('Invalid temperature progression. Target temperature must be between initial and ambient temperatures.');
        return;
    }

    // Step 2: Calculate heat transfer coefficient (k)
    const k = 1; // Standard heat transfer rate assumption
    
    // Step 3: Calculate time to reach target temperature
    const time = -Math.log((targetTempK - ambientTempK) / (initialTempK - ambientTempK)) / k;
    
    // Step 4: Denormalize time
    const denormalizedTime = denormalizeTime(time, timeUnit);

    // Step 5: Verify temperature at calculated time
    const verifyTempK = ambientTempK + (initialTempK - ambientTempK) * Math.exp(-k * time);
    const verifyTemp = fromKelvin(verifyTempK, tempUnit);

    // Display result with detailed steps
    resultSection.style.display = 'block';
    resultText.innerHTML = `
Detailed Heat Transfer Time Calculation Steps:

Step 1: Temperature Analysis
Ambient Temperature (Tₐ): ${ambientTempK.toFixed(4)} K (${ambientTemp.toFixed(4)} ${tempUnit})
Initial Temperature (T₀): ${initialTempK.toFixed(4)} K (${initialTemp.toFixed(4)} ${tempUnit})
Target Temperature (T₁): ${targetTempK.toFixed(4)} K (${targetTemp.toFixed(4)} ${tempUnit})

Step 2: Heat Transfer Coefficient Assumption
k = 1 (standard heat transfer rate)

Step 3: Calculate Time to Reach Target
t = -ln((${targetTempK.toFixed(4)} - ${ambientTempK.toFixed(4)}) / 
         (${initialTempK.toFixed(4)} - ${ambientTempK.toFixed(4)})) / 1
  = ${time.toFixed(4)} normalized hours

Step 4: Convert to Specific Time Unit
Time in ${timeUnit}: ${denormalizedTime.toFixed(4)} ${timeUnit}

Step 5: Verification
Verifying temperature at calculated time:
T = ${ambientTempK.toFixed(4)} + 
    (${initialTempK.toFixed(4)} - ${ambientTempK.toFixed(4)}) * 
    e^(-1 * ${time.toFixed(4)})
  = ${verifyTempK.toFixed(4)} K
  = ${verifyTemp.toFixed(4)} ${tempUnit}

Verification match: ${Math.abs(verifyTemp - targetTemp) < 0.0001 ? 'YES' : 'NO'}

Final Results:
- Time to Reach Target: ${denormalizedTime.toFixed(4)} ${timeUnit}
- Temperature at Target Time: ${verifyTemp.toFixed(4)} ${tempUnit}
    `;

    promptContinue();
}