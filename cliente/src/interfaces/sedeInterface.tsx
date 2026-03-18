export interface Sede {
  country: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  email?: string;
  phone?: string;

  flagSrc: string;

  // Contacto
  mapEmbedSrc?: string;
  mapUrl?: string;

  // About
  description?: string;
}