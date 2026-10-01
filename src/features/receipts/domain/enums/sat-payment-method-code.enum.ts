export enum SatPaymentMethodCode {
  EFECTIVO = "01",
  CHEQUE_NOMINATIVO = "02",
  TRANSFERENCIA_ELECTRONICA_DE_FONDOS = "03",
  TARJETA_DE_CREDITO = "04",
  MONEDERO_ELECTRONICO = "05",
  DINERO_ELECTRONICO = "06",
  VALES_DE_DESPENSA = "08",
  DACION_EN_PAGO = "12",
  PAGO_POR_SUBROGACION = "13",
  PAGO_POR_CONSIGNACION = "14",
  CONDONACION = "15",
  COMPENSACION = "17",
  NOVACION = "23",
  CONFUSION = "24",
  REMISION_DE_DEUDA = "25",
  PRESCRIPCION_O_CADUCIDAD = "26",
  A_SATISFACCION_DEL_ACREEDOR = "27",
  TARJETA_DE_DEBITO = "28",
  TARJETA_DE_SERVICIOS = "29",
  APLICACION_DE_ANTICIPOS = "30",
  POR_DEFINIR = "99",
}

const descriptions = {
  "01": "Efectivo",
  "02": "Cheque nominativo",
  "03": "Transferencia electrónica de fondos",
  "04": "Tarjeta de crédito",
  "05": "Monedero electrónico",
  "06": "Dinero electrónico",
  "08": "Vales de despensa",
  "12": "Dación en pago",
  "13": "Pago por subrogación",
  "14": "Pago por consignación",
  "15": "Condonación",
  "17": "Compensación",
  "23": "Novación",
  "24": "Confusión",
  "25": "Remisión de deuda",
  "26": "Prescripción o caducidad",
  "27": "A satisfacción del acreedor",
  "28": "Tarjeta de débito",
  "29": "Tarjeta de servicios",
  "30": "Aplicación de anticipos",
  "99": "Por definir",
} as const;

export type SatPaymentMethodDescription =
  (typeof descriptions)[SatPaymentMethodCode];

export namespace SatPaymentMethodCode {
  export const getDescription = (
    code: SatPaymentMethodCode,
  ): SatPaymentMethodDescription => descriptions[code];
}
