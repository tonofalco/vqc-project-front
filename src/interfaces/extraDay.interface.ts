export interface ExtraDay {
  id: number;
  cost: string;
  valueEs: number;
  valueFs: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExtraDayCreate {
  cost: string;
  valueEs: number;
  valueFs: number;
}

export interface ExtraDayUpdate {
  cost: string;
  valueEs: number;
  valueFs: number;
}
