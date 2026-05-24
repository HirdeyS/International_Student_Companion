import useReminders from "../hooks/useReminders";
import { createReminder, updateReminder, deleteReminder } from "../services/reminderService";
import { useState } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import TextInput from "../components/ui/TextInput";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function ReminderPage() {
  const {data: reminders, loading, error} = useReminders();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    remindAt: "",
    type: "Custom",
  });

  if (loading) return <Loader/>;
  if (error) return <ErrorMessage message="Failed to load reminders" />;

  async function handleSubmit(e) {
    e.preventDefault();
    await createReminder(form);
    window.location.reload();
  }

  async function markComplete(id, reminder) {
    await updateReminder(id, {...reminder, completed: true});
    window.location.reload();
  }

  async function remove(id) {
    await deleteReminder(id);
    window.location.reload();
  }

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <h2>Your Reminders</h2>

      <Card sx={{ marginBottom: 20 }}>
        <form onSubmit={handleSubmit}>
          <TextInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextInput label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <TextInput type="date" label="Due Date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <TextInput type="datetime-local" label="Remind At" value={form.remindAt} onChange={(e) => setForm({ ...form, remindAt: e.target.value })} />

          <PrimaryButton type="submit">Add Reminder</PrimaryButton>
        </form>
      </Card>

      {reminders.map((r) => (
        <Card key={r._id} sx={{ marginBottom: 20 }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>

          <p>
            <strong>Due:</strong> {new Date(r.dueDate).toLocaleDateString()}
          </p>

          <p>Status: {r.completed ? "Completed" : "Pending"}</p>

          {!r.completed && (
            <PrimaryButton onClick={() => markComplete(r._id, r)} sx={{ marginRight: 10 }}>
              Mark Complete
            </PrimaryButton>
          )}

          <PrimaryButton onClick={() => remove(r._id)} style={{ background: "red" }}>
            Delete
          </PrimaryButton>
        </Card>
      ))}
    </div>
  );
}