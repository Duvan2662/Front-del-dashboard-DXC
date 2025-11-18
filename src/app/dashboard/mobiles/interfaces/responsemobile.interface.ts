

export interface ResponseMobileBD {
  total: number;
  limit: number;
  offset: number;
  data: MobileDevice[];
}

export interface MobileDevice {
  id: string;
  nombre: string;
  tipo: string;
  imei1: string;
  imei2: string | null;
  sistema_operativo: 'Android' | 'Ios' | 'HarmonyOS';
  qr_token: string;
  qr_image: string;
  created_at: string;   // o Date si lo deseas convertir
  updated_at: string;   // o Date si lo deseas convertir
}

