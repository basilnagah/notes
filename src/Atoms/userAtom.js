import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom', // unique ID (with respect to other atoms/selectors)
    default: '' || localStorage.getItem("userToken"), // default value (aka initial value)
  });

  