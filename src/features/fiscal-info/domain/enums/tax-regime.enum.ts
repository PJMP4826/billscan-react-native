export enum TaxRegime {
  R601 = "601",
  R603 = "603",
  R605 = "605",
  R606 = "606",
  R607 = "607",
  R608 = "608",
  R609 = "609",
  R610 = "610",
  R611 = "611",
  R612 = "612",
  R614 = "614",
  R615 = "615",
  R616 = "616",
  R620 = "620",
  R621 = "621",
  R622 = "622",
  R623 = "623",
  R624 = "624",
  R625 = "625",
  R626 = "626",
  R628 = "628",
  R629 = "629",
  R630 = "630",
}

// Diccionario de descripciones mapeado estrictamente a los valores del enum
const TaxRegimeDescriptions: Record<TaxRegime, string> = {
  [TaxRegime.R601]: "General de Ley Personas Morales",
  [TaxRegime.R603]: "Personas Morales con Fines no Lucrativos",
  [TaxRegime.R605]: "Sueldos y Salarios e Ingresos Asimilados a Salarios",
  [TaxRegime.R606]: "Arrendamiento",
  [TaxRegime.R607]: "Régimen de Enajenación o Adquisición de Bienes",
  [TaxRegime.R608]: "Demás ingresos",
  [TaxRegime.R609]: "Consolidación",
  [TaxRegime.R610]: "Residentes en el Extranjero sin Establecimiento Permanente en México",
  [TaxRegime.R611]: "Ingresos por Dividendos (socios y accionistas)",
  [TaxRegime.R612]: "Personas Físicas con Actividades Empresariales y Profesionales",
  [TaxRegime.R614]: "Ingresos por intereses",
  [TaxRegime.R615]: "Régimen de los ingresos por obtención de premios",
  [TaxRegime.R616]: "Sin obligaciones fiscales",
  [TaxRegime.R620]: "Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
  [TaxRegime.R621]: "Incorporación Fiscal",
  [TaxRegime.R622]: "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
  [TaxRegime.R623]: "Opcional para Grupos de Sociedades",
  [TaxRegime.R624]: "Coordinados",
  [TaxRegime.R625]: "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
  [TaxRegime.R626]: "Régimen Simplificado de Confianza (RESICO)",
  [TaxRegime.R628]: "Hidrocarburos",
  [TaxRegime.R629]: "De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales",
  [TaxRegime.R630]: "Enajenación de acciones en bolsa de valores",
};

/**
 * Retorna la descripción oficial del SAT para el régimen fiscal.
 */
export function getTaxRegimeDescription(regime: TaxRegime): string {
  return TaxRegimeDescriptions[regime] ?? "Descripción no encontrada";
}