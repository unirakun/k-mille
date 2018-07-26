
const addImageProcess = (src) => {
  return new Promise((resolve, reject) => {
    // Create an abstract canvas and get context
    const mycanvas = document.createElement("canvas");
    const ctx = mycanvas.getContext('2d');
    // Create an image
    const img = new Image()
    // Once the image loads, render the img on the canvas
    img.onload = function() {
      // Update dimensions of the canvas with the dimensions of the image
      mycanvas.width = this.width;
      mycanvas.height = this.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Execute callback with the base64 URI of the image
      const image = mycanvas.toDataURL("image/png")
      resolve(image)
    }
    img.onerror = reject
    img.src = src
  })
}

export const getClipboardData = async (pasteEvent) => {
  if (!pasteEvent || !pasteEvent.clipboardData || !pasteEvent.clipboardData.items) return

  const { items } = pasteEvent.clipboardData
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // Skip content if not image
    if (item.type.indexOf("image") === -1) continue
    // Retrieve image on clipboard as blob
    const blob = item.getAsFile();

    // Crossbrowser support for URL
    const src = (window.URL || window.webkitURL).createObjectURL(blob)

    // Creates a DOMString containing a URL representing the object given in the parameter
    // namely the original Blob
    return await addImageProcess(src)
  }
}
