import { View } from "@/components/Themed";
import { launchScanner } from "@dariyd/react-native-document-scanner";
import { useState } from "react";
import { Button, Image, StyleSheet } from "react-native";

export default function TabOneScreen() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const escanearDocumento = async () => {
    try {
      // Usamos launchScanner en lugar del Async
      const result = await launchScanner({
        quality: 0.8,
        includeBase64: false,
        includeExif: true, // Mantiene la marca de tiempo y dimensiones
      });

      // La documentación indica que el resultado devuelve un objeto con un arreglo 'images'
      if (result && result.images && result.images.length > 0) {
        const scannedResult = result.images[0];

        // Si la librería devuelve un objeto con uri o un string directo, normalizamos a string.
        const scannedUri =
          typeof scannedResult === "string" ? scannedResult : scannedResult.uri;

        if (scannedUri) {
          setScannedImage(scannedUri);
        }
      }
    } catch (error) {
      console.error("Error al lanzar el escáner: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Escanear Documento" onPress={escanearDocumento} />

      {scannedImage && (
        <Image
          source={{ uri: scannedImage }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderRadius: 8,
  },
});
