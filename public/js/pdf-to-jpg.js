async function convertPdfToJpg() {
  const input = document.getElementById('pdfInput');
  const loading = document.getElementById('loading');
  const output = document.getElementById('output');

  if (!input.files[0]) {
    alert('Please select a PDF file');
    return;
  }

  loading.classList.remove('d-none');
  output.innerHTML = '';

  try {
    const file = input.files[0];
    if (file.size > 50 * 1024 * 1024) {
      alert('File too large. Please upload a file under 50MB.');
      loading.classList.add('d-none');
      return;
    }

    // For simplicity, send to serverless function for conversion
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/pdf-to-jpg', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      const img = document.createElement('img');
      img.src = data.image;
      img.className = 'img-fluid mt-3';
      output.appendChild(img);
    }
  } catch (error) {
    alert('Error processing PDF');
  } finally {
    loading.classList.add('d-none');
  }
}
