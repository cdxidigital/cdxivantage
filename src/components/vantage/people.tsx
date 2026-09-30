import { Plus, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { hoursByPerson } from "@/lib/vantage/selectors";
import { initials } from "@/lib/vantage/format";
import type { PersonStatus } from "@/lib/vantage/types";

const STATUS: { id: PersonStatus; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "onboarding", label: "Onboarding" },
  { id: "contractor", label: "Contractor" },
];

export function PeopleView({ onCreate }: { onCreate: () => void }) {
  const team = useVantage((s) => s.team);
  const data = useVantage();
  const updateTeamMember = useVantage((s) => s.updateTeamMember);
  const removeTeamMember = useVantage((s) => s.removeTeamMember);
  const hours = hoursByPerson(data, data.range);
  const hoursFor = (name: string) => hours.find((h) => h.name === name)?.hours ?? 0;

  return (
    <>
      <div className="toolbar">
        <p className="heading-note" style={{ margin: 0 }}>
          Roles, certifications, and onboarding. The people graph sits on the same master record as customers and cash.
        </p>
        <button className="button-primary" onClick={onCreate}>
          <Plus size={16} /> Add person
        </button>
      </div>
      {team.length === 0 ? (
        <section className="panel">
          <div className="empty-icon">
            <UsersRound size={20} />
          </div>
          <h2>No people yet.</h2>
          <p className="heading-note">Add the first operator, contractor, or hire.</p>
        </section>
      ) : (
        <div className="people-grid">
          {team.map((person) => (
            <article key={person.id} className="panel person-card">
              <div className="person-head">
                <div className="avatar avatar-blue">{initials(person.name)}</div>
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>
              </div>
              <p className="muted-line">{person.email}</p>
              <p className="muted-line">{hoursFor(person.name)}h this period</p>
              {(person.certifications ?? []).length > 0 && (
                <div className="related-stack">
                  {(person.certifications ?? []).map((cert) => (
                    <span className="related-chip" key={cert}>
                      {cert}
                    </span>
                  ))}
                </div>
              )}
              <div className="field">
                <label htmlFor={`st-${person.id}`}>Status</label>
                <select
                  id={`st-${person.id}`}
                  value={person.status || "active"}
                  onChange={(e) => {
                    updateTeamMember(person.id, { status: e.target.value as PersonStatus });
                    toast.success("Status updated");
                  }}
                >
                  {STATUS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              {person.id !== "t_self" && (
                <button
                  className="button-ghost"
                  onClick={() => {
                    removeTeamMember(person.id);
                    toast.success("Person removed");
                  }}
                >
                  Remove
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
