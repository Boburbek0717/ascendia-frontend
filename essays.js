// Handle text submission
document.getElementById("essay-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const essay = document.getElementById("essay").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!essay || !email) {
    document.getElementById("text-response").innerText = "Please fill in both fields.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/upload-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ essay, email })
    });

    const data = await res.json();
    document.getElementById("text-response").innerText = data.message || "Essay submitted successfully!";
    document.getElementById("essay-form").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("text-response").innerText = "Error submitting essay.";
  }
});

// Handle file upload
document.getElementById("file-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = document.getElementById("essay-file").files[0];
  const email = document.getElementById("file-email").value.trim();

  if (!file || !email) {
    document.getElementById("file-response").innerText = "Please select a file and enter your email.";
    return;
  }

  const formData = new FormData();
  formData.append("essayFile", file);
  formData.append("email", email);

  try {
    const res = await fetch("http://localhost:3000/upload-file", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    document.getElementById("file-response").innerText = data.message || "File uploaded successfully!";
    document.getElementById("file-form").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("file-response").innerText = "Error uploading file.";
  }
});
