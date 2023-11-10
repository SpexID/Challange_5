const messageContainer = document.getElementById('message-container');
const formUpload = document.getElementById('form-upload');
const preview = document.getElementById('preview');
const inputFile = document.getElementById('file-input');
const btnSubmit = document.getElementById('btn-submit');

formUpload.addEventListener('submit', handleSubmitFormUpload);
inputFile.addEventListener('change', handleChangeInputFile);

function renderMessage(type, response) {
  const { message, url } = response;
  if (type === 'success') {
    messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message} <a href="${url}" download>Download</a></div>`;
  } else {
    messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }
}

function handleChangeInputFile(e) {
  const files = e.target.files;
  if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}" class="img-thumbnail" alt="preview" style="max-width: 500px; max-height: 500px;" />`;
      };
      reader.readAsDataURL(file);
  }
}

async function handleSubmitFormUpload(e) {
  e.preventDefault();
  // buat tulisan button menjadi loading di sini.
  btnSubmit.innerText = 'Loading...';
  try {
    const formData = new FormData(formUpload);
    const response = await fetch('/api/car', {
      method: 'post',
      body: formData,
    });
    const data = await response.json();
    renderMessage('success', data);
  } catch (error) {
    renderMessage('failed', { message: 'Upload failed' });
  } finally {
    // ubah tulisan button menjadi Submit kembali di sini.
    btnSubmit.innerText = 'Submit';
  }
}
