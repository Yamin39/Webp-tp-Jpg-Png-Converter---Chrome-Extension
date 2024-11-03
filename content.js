chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "convert") {
    console.log(request.imageUrl);
    fetch(request.imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          chrome.storage.sync.get("quality", ({ quality = 0.8 }) => {
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `converted.${request.format === "image/jpeg" ? "jpg" : "png"}`;
              a.click();
              URL.revokeObjectURL(url);
            }, request.format, quality);
          });
        };
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
});

