import { getReminders } from "../services/reminderService";
import useFetch from "./useFetch";

export default function useReminders() {
    return useFetch(getReminders, []);
}