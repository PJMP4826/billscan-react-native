import { Button, Image, StyleSheet, View } from "react-native";
import { useReceiptSubmit } from "../../../hooks/useReceiptSubmit";
import { CapturedImage } from "../domain/value_objects/CapturedImage";
import { useCaptureContext } from "../context/CaptureContext";

type CaptureScreenProps = {
  images: CapturedImage[];
  isCapturing: boolean;
  onCapture: () => void;
  onReset: () => void;
};

export function CaptureScreen() {
  const { images, isCapturing, isSubmitting, submit, triggerCapture, reset } =
    useCaptureContext();

  return (
    <View style={styles.container}>
      <Button
        title={isCapturing ? "Scanning..." : "Scan"}
        onPress={triggerCapture}
        disabled={isCapturing}
      />
      {images.map((img) => (
        <Image key={img.uri} source={{ uri: img.uri }} style={styles.image} />
      ))}
      {images.length > 0 && (
        <Button
          title={isSubmitting ? "Uploading..." : "Upload"}
          onPress={submit}
          disabled={isSubmitting}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  image: { width: "100%", height: 300, marginTop: 12, borderRadius: 8 },
});