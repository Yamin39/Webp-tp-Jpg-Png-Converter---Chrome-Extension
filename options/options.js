document.getElementById("quality").addEventListener("input", (event) => {
  chrome.storage.sync.set({ quality: event.target.value });
});
