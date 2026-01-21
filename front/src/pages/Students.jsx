import { useEffect, useState } from "react";
import api, { authHeaders } from "../api/axios";

function Students() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({ name: "", age: "", city: "", fees: "" });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/", { headers: authHeaders() });
      setStudents(res.data || []);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", age: "", city: "", fees: "" });
    setEditId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(
          `/put/${editId}`,
          {
            name: form.name,
            age: form.age,
            city: form.city,
            fees: form.fees,
          },
          { headers: authHeaders() }
        );
      } else {
        await api.post(
          "/post",
          {
            name: form.name,
            age: form.age,
            city: form.city,
            fees: form.fees,
          },
          { headers: authHeaders() }
        );
      }
      resetForm();
      await load();
    } catch (err) {
      // ignore
    }
  };

  const onEdit = (s) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      age: s.age,
      city: s.city,
      fees: s.fees,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await api.delete(`/delete/${id}`, { headers: authHeaders() });
      await load();
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Students</h3>
        <button
          className="btn btn-secondary"
          onClick={() => {
            resetForm();
            load();
          }}
        >
          Refresh
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editId ? "Edit Student" : "Add New Student"}
          </h5>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={form.age}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Fees</label>
              <input
                type="number"
                className="form-control"
                name="fees"
                value={form.fees}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-2 d-flex align-items-end gap-2">
              <button className="btn btn-primary" type="submit">
                {editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Fees</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5">No students found</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.city}</td>
                  <td>{s.fees}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
