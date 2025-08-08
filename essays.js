document.getElementById("essay-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const essay = document.getElementById("essay").value;
  const email = document.getElementById("email").value;

  try {
    const res = await fetch("http://localhost:3000/submit-essay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ essay, email })
    });
    const data = await res.json();
    document.getElementById("text-response").innerText = data.message || "Essay submitted successfully.";
  } catch (err) {
    document.getElementById("text-response").innerText = "Error submitting essay.";
  }
});

// Handle file upload
document.getElementById("file-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("essay", document.getElementById("essay-file").files[0]);
  formData.append("email", document.getElementById("file-email").value);

  try {
    const res = await fetch("http://localhost:3000/upload-essay", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    document.getElementById("file-response").innerText = data.message || "File uploaded successfully.";
  } catch (err) {
    document.getElementById("file-response").innerText = "Error uploading file.";
  }
});
""