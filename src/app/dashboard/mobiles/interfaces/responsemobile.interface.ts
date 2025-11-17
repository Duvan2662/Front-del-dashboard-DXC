import { MobileBD } from "./mobileBD.interface";


export interface ResponseMobileBD {
  total: number;
  limit: number;
  offset: number;
  data: MobileBD[];
}
