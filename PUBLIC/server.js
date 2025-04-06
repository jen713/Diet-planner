document.getElementById('dietForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ageCategory = document.getElementById('ageCategory').value;
    const currentWeight = document.getElementById('currentWeight').value;
    const targetWeight = document.getElementById('targetWeight').value;
    const exerciseSchedule = JSON.parse(document.getElementById('exerciseSchedule').value);

    const response = await fetch('/api/diet-plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ageCategory, currentWeight, targetWeight, exerciseSchedule })
    });

    const dietPlan = await response.json();
    displayDietPlan(dietPlan);
});

function displayDietPlan(dietPlan) {
    const dietPlanDiv = document.getElementById('dietPlan');
    dietPlanDiv.innerHTML = `<h2>Your Diet Plan</h2><pre>${JSON.stringify(dietPlan, null, 2)}</pre>`;
}