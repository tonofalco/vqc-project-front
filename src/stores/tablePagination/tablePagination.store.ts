import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface PaginationEvents {
  landCurrentPage: number;
  landItemsPerPage: number;

  airCurrentPage: number;
  airItemsPerPage: number;

  myLandCurrentPage: number;
  myLandItemsPerPage: number;

  myAirCurrentPage: number;
  myAirItemsPerPage: number;


  landSetPage: (page: number) => void;
  airSetPage: (page: number) => void;
  myLandSetPage: (page: number) => void;
  myAirSetPage: (page: number) => void;

}

export const useTablePaginationStore = create<PaginationEvents>()(
  devtools((set) => ({

    landCurrentPage: 1,
    landItemsPerPage: 10,

    airCurrentPage: 1,
    airItemsPerPage: 10,

    myLandCurrentPage: 1,
    myLandItemsPerPage: 10,

    myAirCurrentPage: 1,
    myAirItemsPerPage: 10,

    landSetPage: (page: number) => set({ landCurrentPage: page }),
    airSetPage: (page: number) => set({ airCurrentPage: page }),

    myLandSetPage: (page: number) => set({ myLandCurrentPage: page }),
    myAirSetPage: (page: number) => set({ myAirCurrentPage: page }),

  }))
);