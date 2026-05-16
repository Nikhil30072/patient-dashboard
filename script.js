async function loadPatientData() {

  try {

    const response = await fetch('./data/patients.json');

    const data = await response.json();

    console.log("FULL DATA:", data);

    const patient = data.find(
      item => item.name === "Jessica Taylor"
    );

    console.log("PATIENT:", patient);

    /* PROFILE */

    document.getElementById("profileImage").src =
      patient.profile_picture;

    document.getElementById("name").innerText =
      patient.name;

    document.getElementById("dob").innerText =
      patient.date_of_birth;

    document.getElementById("gender").innerText =
      patient.gender;

    document.getElementById("phone").innerText =
      patient.phone_number;

    document.getElementById("emergency").innerText =
      patient.emergency_contact;

    document.getElementById("insurance").innerText =
      patient.insurance_type;

    /* LATEST HEALTH DATA */

    const latest = patient.diagnosis_history[0];

    document.getElementById("respiratory").innerText =
      latest.respiratory_rate.value + " bpm";

    document.getElementById("temperature").innerText =
      latest.temperature.value + "°F";

    document.getElementById("heart").innerText =
      latest.heart_rate.value + " bpm";

    /* DIAGNOSTIC TABLE */

    const table =
      document.getElementById("diagnosticTable");

    patient.diagnostic_list.forEach(item => {

      table.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.status}</td>
        </tr>
      `;
    });

    /* LAB RESULTS */

    const lab =
      document.getElementById("labResults");

    patient.lab_results.forEach(item => {

      lab.innerHTML += `
        <li>${item}</li>
      `;
    });

    /* CHART */

    const history =
      patient.diagnosis_history
      .slice(0, 6)
      .reverse();

    const labels = history.map(item =>
      `${item.month} ${item.year}`
    );

    const systolic = history.map(item =>
      item.blood_pressure.systolic.value
    );

    const diastolic = history.map(item =>
      item.blood_pressure.diastolic.value
    );

    const ctx =
      document.getElementById("bpChart");

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

        maintainAspectRatio: false

      }

    });

  }

  catch(error) {

    console.error(error);

  }

}

loadPatientData();