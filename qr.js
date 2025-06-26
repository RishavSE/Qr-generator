
const btn = document.querySelector(".button");
const qr_code_element = document.querySelector(".qr-code");
const inputField = document.querySelector("#input_text");

// Listen for the button click
btn.addEventListener("click", () => {
  const raw_input = inputField.value.trim();
  generateQRCodeForInput(raw_input);
});

// Listen for the Enter key press in the input field
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const raw_input = inputField.value.trim();
    generateQRCodeForInput(raw_input);
  }
});

// Function to process the input and generate the QR code
function generateQRCodeForInput(raw_input) {
  if (raw_input !== "") {
    const formatted_input = formatInput(raw_input);
    qr_code_element.style.display = "flex";
    qr_code_element.innerHTML = ""; // Clear previous QR code
    generateQRCode(formatted_input);
  } else {
    console.log("not valid input");
    qr_code_element.style.display = "none";
    qr_code_element.innerHTML = "";
  }
}

// Function to format input (adding 'https://' if missing)
function formatInput(text) {
  if (/^(http:\/\/|https:\/\/|www\.)/i.test(text)) {
    return text.startsWith("http") ? text : `https://${text}`;
  }
  const searchQuery = encodeURIComponent(text);
  return `https://www.google.com/search?q=${searchQuery}`;
}

// Function to generate the QR code
function generateQRCode(text) {
  const qr_container = document.createElement("div");
  qr_container.style.padding = "16px"; // Add quiet zone
  qr_code_element.appendChild(qr_container);

  const qrcode = new QRCode(qr_container, {
    text: text,
    width: 300,  // Bigger and sharper
    height: 300,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M, // Medium for better clarity
  });

  const downloadBtn = document.createElement("button");
  const downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "qr_code.png");
  downloadLink.innerText = "Download QR Code";

  downloadBtn.appendChild(downloadLink);
  qr_code_element.appendChild(downloadBtn);

  // Set the download link after the QR code is rendered
  setTimeout(() => {
    const qr_code_canvas = qr_code_element.querySelector("canvas");

    if (qr_code_canvas) {
      downloadLink.setAttribute("href", qr_code_canvas.toDataURL("image/png"));
    }
  }, 300);
}