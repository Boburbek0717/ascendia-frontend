fetch('http://localhost:3000/admin/files')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#essays-table tbody");
    data.forEach(entry => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${entry.email}</td>
        <td>${entry.originalName}</td>
        <td>${new Date(entry.timestamp).toLocaleString()}</td>
        <td><a class="download-link" href="http://localhost:3000${entry.url}" download>Download</a></td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading admin data:", err);
    document.querySelector("body").innerHTML += "<p style='color:red;'>Failed to load uploaded files.</p>";
  });