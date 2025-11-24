import { getListings } from "../services/listingService";
import useFetch from "./useFetch";

export default function useListings() {
    return useFetch(getListings, []);
}