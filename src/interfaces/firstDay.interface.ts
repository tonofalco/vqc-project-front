export interface FirstDay {
  id: number;
  gasoline: number;
  salary: number;
  booths: number;
  maintenance: number;
  utility: number;
  supplement: number;
  createdAt: string;
  updatedAt: string;
}

export interface FirstDayUpdate {
  gasoline?: number;
  salary?: number;
  booths?: number;
  maintenance?: number;
  utility?: number;
  supplement?: number;
}
