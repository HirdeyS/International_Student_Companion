import api from "./api";

//Get all reminders
export async function getReminders() {
    const res = await api.get("/reminders");
    return res.data;
}

//Create reminder
export async function createReminder(data) {
    const res = await api.post("/reminders", data);
    return res.data;
}

//Update reminder
export async function updateReminder(id, data) {
    const res = await api.put(`/reminders/${id}`, data);
    return res.data;
}

//Delete reminder
export async function deleteReminder(id) {
    const res = await api.delete(`/reminders/${id}`);
    return res.data;
}