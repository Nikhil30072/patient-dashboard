const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const username = "coalition";
const password = "skills-test";

const auth = btoa(`${username}:${password}`);

async function fetchPatientData() {

  try {

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    const data = await response.json();

    const patient = data.find(
      p => p.name === "Jessica Taylor"
    );

    loadPatientProfile(patient);
    loadDiagnostics(patient);
    loadChart(patient);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function loadPatientProfile(patient){

  document.getElementById("profilePicture").src =
    patient.profile_picture;

  document.getElementById("patientName").innerText =
    patient.name;

  document.getElementById("patientDOB").innerText =
    `DOB: ${patient.date_of_birth}`;

  document.getElementById("patientGender").innerText =
    `Gender: ${patient.gender}`;

  document.getElementById("patientPhone").innerText =
    `Phone: ${patient.phone_number}`;
}

function loadDiagnostics(patient){

  const table = document.getElementById("diagnosticTable");

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

function loadChart(patient){

  const diagnosisHistory = patient.diagnosis_history;

  const labels = diagnosisHistory.map(item =>
    `${item.month} ${item.year}`
  );

  const systolicData = diagnosisHistory.map(item =>
    item.blood_pressure.systolic.value
  );

  const diastolicData = diagnosisHistory.map(item =>
    item.blood_pressure.diastolic.value
  );

  const ctx = document.getElementById("bpChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "#e66fd2",
          tension: 0.4
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "#8c6fe6",
          tension: 0.4
        }
      ]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false
    }
  });
}

fetchPatientData();