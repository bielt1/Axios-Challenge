const fs = require("fs");
const axios = require("axios").default;
const csv = require("csv-parser");

async function downloadImagesFromCSV(ch-swisstopo-swissimage-dop10-wxGGDPiR.csv) {
  // Lese das CSV-File Zeile für Zeile ein
  fs.createReadStream(ch-swisstopo-swissimage-dop10-wxGGDPiR.csv)
    .pipe(csv())
    .on("data", async (row) => {
      // Extrahiere den Link aus der aktuellen Zeile
      const imageUrl = row["imageUrl"];
      // Extrahiere den Dateinamen aus der aktuellen Zeile
      const filename = row["filename"];

      try {
        // Lade das Bild herunter und speichere es lokal
        await downloadImage(imageUrl, filename);
        console.log(`Bild erfolgreich heruntergeladen: ${filename}`);
      } catch (error) {
        console.error(`Fehler beim Herunterladen des Bildes ${filename}: ${error}`);
      }
    })
    .on("end", () => {
      console.log("Alle Bilder wurden heruntergeladen.");
    });
}

async function downloadImage(url, filePath) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, response.data, { encoding: "binary" });
}

// Beispielaufruf der Funktion mit dem Pfad zum CSV-File
downloadImagesFromCSV("ch.swisstopo.swissimage-dop10-wxGGDPiR.csv");
