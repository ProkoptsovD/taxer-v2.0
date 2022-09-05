import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

export const useStoreContext = () => useContext(StoreContext);