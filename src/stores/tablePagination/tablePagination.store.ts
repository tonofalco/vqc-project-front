import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface PaginationEvents {

  landCurrentPage: number;
  airCurrentPage: number;
  myLandCurrentPage: number;
  myAirCurrentPage: number;
  usersCurrentPage: number;

  landItemsPerPage: number;
  airItemsPerPage: number;
  myLandItemsPerPage: number;
  myAirItemsPerPage: number;
  usersItemsPerPage: number;


  landSetPage: (page: number) => void;
  airSetPage: (page: number) => void;
  myLandSetPage: (page: number) => void;
  myAirSetPage: (page: number) => void;
  usersSetPage: (page: number) => void;
}

export const useTablePaginationStore = create<PaginationEvents>()(
  devtools((set) => ({

    landCurrentPage: 1,
    airCurrentPage: 1,
    myLandCurrentPage: 1,
    myAirCurrentPage: 1,
    usersCurrentPage: 1,

    landItemsPerPage: 10,
    airItemsPerPage: 10,
    myLandItemsPerPage: 10,
    myAirItemsPerPage: 10,
    usersItemsPerPage: 10,

    landSetPage: (page: number) => set({ landCurrentPage: page }),
    airSetPage: (page: number) => set({ airCurrentPage: page }),
    myLandSetPage: (page: number) => set({ myLandCurrentPage: page }),
    myAirSetPage: (page: number) => set({ myAirCurrentPage: page }),
    usersSetPage: (page: number) => set({ usersCurrentPage: page }),
  }))
);