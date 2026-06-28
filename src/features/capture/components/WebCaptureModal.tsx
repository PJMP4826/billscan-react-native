import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/CaptureWebSource";

export function WebCaptureModal() {
  const { webModalVisible, setWebModalVisible, captureFromWeb } =
    useCaptureContext();
  const [webMode, setWebMode] = useState<"camera" | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const openWebCamera = async () => {
    if (!permission?.granted) await requestPermission();
    setWebMode("camera");
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    await cameraRef.current.takePictureAsync({ quality: 0.8 });
    await captureFromWeb(CaptureWebSource.CAMERA);
    setWebMode(null);
  };

  const onClose = () => {
    setWebMode(null);
    setWebModalVisible(false);
  };

  return (
    <Modal
      visible={webModalVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {webMode === "camera" ? (
            <View style={{ width: "100%", gap: 12 }}>
              {permission?.granted ? (
                <CameraView ref={cameraRef} style={styles.cameraPreview} />
              ) : (
                <Text style={styles.permissionText}>
                  Camera permission denied. Enable it in your browser settings.
                </Text>
              )}
              <Pressable style={styles.captureBtn} onPress={takePicture}>
                <Ionicons name="camera" size={20} color="#fff" />
                <Text style={styles.captureBtnText}>Take Photo</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setWebMode(null)}>
                <Text style={styles.cancelText}>← Back</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.sheetTitle}>Add Receipt</Text>
              <Text style={styles.sheetSubtitle}>
                How do you want to add the image?
              </Text>
              <Pressable style={styles.option} onPress={openWebCamera}>
                <Ionicons name="camera-outline" size={28} color="#3b42e4" />
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>Use Camera</Text>
                  <Text style={styles.optionHint}>Take a photo right now</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.option}
                onPress={() => captureFromWeb(CaptureWebSource.LIBRARY)}>
                <Ionicons name="image-outline" size={28} color="#3b42e4" />
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>Choose from Library</Text>
                  <Text style={styles.optionHint}>Pick an existing image</Text>
                </View>
              </Pressable>
              <Pressable style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  sheet: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  sheetTitle: { fontSize: 18, fontWeight: "700", color: "#1a1a2e" },
  sheetSubtitle: { fontSize: 14, color: "#8e8e93", marginTop: -8 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f7",
    gap: 14,
  },
  optionText: { flex: 1 },
  optionLabel: { fontSize: 15, fontWeight: "600", color: "#1a1a2e" },
  optionHint: { fontSize: 13, color: "#8e8e93", marginTop: 2 },
  cameraPreview: { width: "100%", height: 280, borderRadius: 12 },
  permissionText: { color: "#ff3b30", textAlign: "center", fontSize: 14 },
  captureBtn: {
    flexDirection: "row",
    backgroundColor: "#3b42e4",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  captureBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  cancelBtn: { paddingVertical: 8 },
  cancelText: { color: "#8e8e93", fontSize: 14, textAlign: "center" },
});
