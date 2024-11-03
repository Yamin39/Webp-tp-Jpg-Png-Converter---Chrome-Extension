chrome.contextMenus.create({
  id: "convertToJpg",
  title: "Save image as JPG",
  contexts: ["image"],
});

chrome.contextMenus.create({
  id: "convertToPng",
  title: "Save image as PNG",
  contexts: ["image"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToJpg" || info.menuItemId === "convertToPng") {
    const format = info.menuItemId === "convertToJpg" ? "image/jpeg" : "image/png";
    chrome.tabs.sendMessage(tab.id, { action: "convert", imageUrl: info.srcUrl, format });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
});

