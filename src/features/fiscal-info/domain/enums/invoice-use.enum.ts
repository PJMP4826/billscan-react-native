export enum InvoiceUse {
  // Gastos y Mercancías
  G01 = "G01",
  G02 = "G02",
  G03 = "G03",

  // Inversiones
  I01 = "I01",
  I02 = "I02",
  I03 = "I03",
  I04 = "I04",
  I05 = "I05",
  I06 = "I06",
  I07 = "I07",
  I08 = "I08",

  // Deducciones Personales
  D01 = "D01",
  D02 = "D02",
  D03 = "D03",
  D04 = "D04",
  D05 = "D05",
  D06 = "D06",
  D07 = "D07",
  D08 = "D08",
  D09 = "D09",
  D10 = "D10",

  // Otros / Especiales
  P01 = "P01",
  S01 = "S01",
  CP01 = "CP01",
  CN01 = "CN01",
}

// Diccionario de descripciones mapeado estrictamente a los valores del enum
const InvoiceUseDescriptions: Record<InvoiceUse, string> = {
  // Gastos y Mercancías
  [InvoiceUse.G01]: "Adquisición de mercancías",
  [InvoiceUse.G02]: "Devoluciones, descuentos o bonificaciones",
  [InvoiceUse.G03]: "Gastos en general",

  // Inversiones
  [InvoiceUse.I01]: "Construcciones",
  [InvoiceUse.I02]: "Mobiliario y equipo de oficina por inversiones",
  [InvoiceUse.I03]: "Equipo de transporte",
  [InvoiceUse.I04]: "Equipo de cómputo y accesorios",
  [InvoiceUse.I05]: "Dados, troqueles, moldes, matrices y herramental",
  [InvoiceUse.I06]: "Comunicaciones telefónicas",
  [InvoiceUse.I07]: "Comunicaciones satelitales",
  [InvoiceUse.I08]: "Otra maquinaria y equipo",

  // Deducciones Personales
  [InvoiceUse.D01]: "Honorarios médicos, dentales y gastos hospitalarios",
  [InvoiceUse.D02]: "Gastos médicos por incapacidad o discapacidad",
  [InvoiceUse.D03]: "Gastos funerales",
  [InvoiceUse.D04]: "Donativos",
  [InvoiceUse.D05]:
    "Intereses reales efectivamente pagados por créditos hipotecarios",
  [InvoiceUse.D06]: "Aportaciones voluntarias al SAR",
  [InvoiceUse.D07]: "Primas por seguros de gastos médicos",
  [InvoiceUse.D08]: "Gastos de transportación escolar obligatoria",
  [InvoiceUse.D09]: "Depósitos en cuentas para el ahorro / planes de pensiones",
  [InvoiceUse.D10]: "Pagos por servicios educativos (colegiaturas)",

  // Otros / Especiales
  [InvoiceUse.P01]: "Por definir",
  [InvoiceUse.S01]: "Sin efectos fiscales",
  [InvoiceUse.CP01]: "Pagos",
  [InvoiceUse.CN01]: "Nómina",
};

/**
 * Retorna la descripción oficial del SAT para el código de uso de CFDI.
 */
export function getInvoiceUseDescription(use: InvoiceUse): string {
  return InvoiceUseDescriptions[use] ?? "Descripción no encontrada";
}
