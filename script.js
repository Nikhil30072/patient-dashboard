async function loadPatientData() {

  try {

    const response = await fetch('./data/patients.json');

    const data = await response.json();

    const patient = data.find(
      item => item.name === "Jessica Taylor"
    );

    displayProfile(patient);
    displayStats(patient);
    displayDiagnosticList(patient);
    displayLabResults(patient);
    createChart(patient);

  }

  catch (error) {
    console.error("Error loading patient data:", error);
  }

}

/* Profile */

function displayProfile(patient) {

  document.getElementById('profileImage').src =
    patient.profile_picture;

  document.getElementById('name').innerText =
    patient.name;

  document.getElementById('dob').innerText =
    patient.date_of_birth;

  document.getElementById('gender').innerText =
    patient.gender;

  document.getElementById('phone').innerText =
    patient.phone_number;

  document.getElementById('emergency').innerText =
    patient.emergency_contact;

  document.getElementById('insurance').innerText =
    patient.insurance_type;
}

/* Stats */

function displayStats(patient) {

  const latest = patient.diagnosis_history[0];

  document.getElementById('respiratory').innerText =
    latest.respiratory_rate.value + " bpm";

  document.getElementById('temperature').innerText =
    latest.temperature.value + "°F";

  document.getElementById('heart').innerText =
    latest.heart_rate.value + " bpm";
}

/* Diagnostic List */

function displayDiagnosticList(patient) {

  const table =
    document.getElementById('diagnosticTable');

  patient.diagnostic_list.forEach(item => {

    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.status}</td>
      </tr>
    `;
  });
}

/* Lab Results */

function displayLabResults(patient) {

  const lab =
    document.getElementById('labResults');

  patient.lab_results.forEach(item => {

    lab.innerHTML += `
      <li>${item}</li>
    `;
  });
}

/* Chart */

function createChart(patient) {

  const history =
    patient.diagnosis_history.slice(0, 6).reverse();

  const labels = history.map(
    item => `${item.month} ${item.year}`
  );

  const systolic = history.map(
    item => item.blood_pressure.systolic.value
  );

  const diastolic = history.map(
    item => item.blood_pressure.diastolic.value
  );

  const ctx =
    document.getElementById('bpChart');

  new Chart(ctx, {

    type: 'line',

    data: {

      labels: labels,

      datasets: [

        {
          label: 'Systolic',
          data: systolic,
          borderColor: '#E66FD2',
          backgroundColor: '#E66FD2',
          tension: 0.4
        },

        {
          label: 'Diastolic',
          data: diastolic,
          borderColor: '#8C6FE6',
          backgroundColor: '#8C6FE6',
          tension: 0.4
        }

      ]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {
          position: 'top'
        }

      }

    }

  });

}

loadPatientData();