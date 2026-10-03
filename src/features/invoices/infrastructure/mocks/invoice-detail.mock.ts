import type { InvoiceDetailData } from "@/src/features/invoices/infrastructure/schemas/invoice-detail.schema";

/**
 * Detalle de CFDI mock que replica la respuesta de `GET /cfdis/{receipt_uuid}`
 * para poder maquetar/validar la pantalla sin backend.
 */
export const invoiceDetailMockItems: Record<string, InvoiceDetailData> = {
  "9f4c2e7a1b8d4c3e8f5a6b7c0d1e2f30": {
    receipt_uuid: "9f4c2e7a1b8d4c3e8f5a6b7c0d1e2f30",
    cfdi: {
      emisor: {
        rfc: "TAN240115H72",
        nombre: "TECNOLOGIAS ANDES DEL NORTE",
        regimen_fiscal: "601 - General de Ley Personas Morales",
      },
      receptor: {
        rfc: "RASA900312M45",
        nombre: "ANA LUCIA RAMIREZ SOTO",
        domicilio_fiscal_receptor: "06700",
        regimen_fiscal_receptor:
          "612 - Personas Físicas con Actividades Empresariales y Profesionales",
        uso_cfdi: "G03 - Gastos en general",
      },
      conceptos: [
        {
          clave_prod_serv: "81112100 - servicios de cómputo en la nube",
          cantidad: 1,
          clave_unidad: "E48 - Unidad de servicio",
          descripcion: "Suscripción mensual de cómputo en la nube",
          valor_unitario: 1000,
          importe: 1000,
          objeto_imp: "02 - Sí objeto de impuesto",
          impuestos: {
            traslados: {
              "002|Tasa|0.160000": {
                base: 1000,
                impuesto: "002 - IVA",
                tipo_factor: "Tasa",
                tasa_o_cuota: 0.16,
                importe: 160,
              },
            },
            total_impuestos_trasladados: null,
          },
          no_identificacion: "REF-2026-0001",
          unidad: "Servicio",
          descuento: null,
        },
      ],
      complemento: {
        timbre_fiscal_digital: {
          version: "1.1",
          uuid: "B4D2E6F8-1A3C-4E5B-9D7F-2C8A0B1D3E5F",
          fecha_timbrado: "2026-02-14T10:22:31",
          rfc_prov_certif: "AAA010101AAA",
        },
        cfdi_registro_fiscal: null,
      },
      version: "4.0",
      fecha: "2026-02-14T10:15:02",
      forma_pago: "01 - Efectivo",
      sub_total: 1000,
      moneda: "MXN - Peso Mexicano",
      total: 1160,
      tipo_de_comprobante: "I - Ingreso",
      exportacion: "01 - No aplica",
      metodo_pago: "PUE - Pago en una sola exhibición",
      lugar_expedicion: "06700",
      impuestos: {
        traslados: {
          "002|Tasa|0.160000": {
            base: 1000,
            impuesto: "002 - IVA",
            tipo_factor: "Tasa",
            tasa_o_cuota: 0.16,
            importe: 160,
          },
        },
        total_impuestos_trasladados: 160,
      },
      serie: "MOCK",
      folio: "00000123",
      condiciones_de_pago: "Contado",
      tipo_cambio: 1,
      descuento: null,
    },
    xml_url: "https://example.com/cfdi/9f4c2e7a1b8d4c3e8f5a6b7c0d1e2f30.xml",
    pdf_url: "https://example.com/cfdi/9f4c2e7a1b8d4c3e8f5a6b7c0d1e2f30.pdf",
  },
};

/** Fallback determinista: cualquier UUID desconocido recibe un detalle válido. */
export const getInvoiceDetailMockItem = (
  receiptUuid: string,
): InvoiceDetailData => {
  const existing = invoiceDetailMockItems[receiptUuid];

  if (existing) {
    return existing;
  }

  return {
    ...invoiceDetailMockItems["9f4c2e7a1b8d4c3e8f5a6b7c0d1e2f30"],
    receipt_uuid: receiptUuid,
  };
};
