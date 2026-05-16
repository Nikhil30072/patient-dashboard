async function loadPatientData() {

  try {

    const response = await fetch('./data/patients.json');

    if (!response.ok) {
      throw new Error("JSON file not found");
    }

    const data = await response.json();

    console.log(data);

    const patient = data.find(
      p => p.name === "Jessica Taylor"
    );

    console.log(patient);

    if (!patient) {
      throw new Error("Jessica Taylor not found");
    }

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

    /* LATEST STATS */

    const latest = patient.diagnosis_history[0];

    document.getElementById("respiratory").innerText =
      latest.respiratory_rate.value + " bpm";

    document.getElementById("temperature").innerText =
      latest.temperature.value + "°F";

    document.getElementById("heart").innerText =
      latest.heart_rate.value + " bpm";

    /* DIAGNOSTIC LIST */

    const table =
      document.getElementById("diagnosticTable");

    patient.diagnostic_list.forEach(item => {

      const row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.status}</td>
        </tr>
      `;

      table.innerHTML += row;
    });

    /* LAB RESULTS */

    const labResults =
      document.getElementById("labResults");

    patient.lab_results.forEach(item => {

      const li = document.createElement("li");

      li.innerText = item;

      labResults.appendChild(li);
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

      type: "line",

      data: {

        labels: labels,

        datasets: [

          {
            label: "Systolic",
            data: systolic,
            borderColor: "#E66FD2",
            backgroundColor: "#E66FD2",
            tension: 0.4,
            fill: false
          },

          {
            label: "Diastolic",
            data: diastolic,
            borderColor: "#8C6FE6",
            backgroundColor: "#8C6FE6",
            tension: 0.4,
            fill: false
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {
            position: "top"
          }

        },

        scales: {

          y: {
            beginAtZero: false
          }

        }

      }

    });

  }

  catch (error) {

    console.error(error);

    alert("Error loading patient data. Check console.");

  }

}

loadPatientData();