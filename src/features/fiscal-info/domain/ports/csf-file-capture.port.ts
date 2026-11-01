import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";

export interface CsfFileCapturePort {
  capture(): Promise<CsfFile | null>;
}
