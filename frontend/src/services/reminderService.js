import api from "./api";

export async function getReminders() {
    const res = await api.get("/reminders");
    return res.data;
}

export async function createReminder(data) {
    const res = await api.post("/reminders", data);
}

export async function updateReminder(id, data) {
    const res = await api.put(`/reminders/${id}`, data);
    return res.data;
}

export async function deleteReminder(id) {
    const res = await api.delete(`/reminders/${id}`);
    return res.data;
}