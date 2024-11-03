const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault(); // Prevent default to allow drop
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file && file.type === "image/webp") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "converted.jpg";
          a.click();
          URL.revokeObjectURL(url);
        }, "image/jpeg");
      };
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please drop a WebP image file.");
  }
});

dropZone.addEventListener("click", () => {
  dropZone.click();
});

