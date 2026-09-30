import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useVantage } from "@/lib/vantage/store";
import { todayIso } from "@/lib/vantage/format";

export function CalendarView({ onCreate }: { onCreate: () => void }) {
  const events = useVantage((s) => s.events);
  const removeEvent = useVantage((s) => s.removeEvent);
  const [cursor, setCursor] = useState(() => new Date());
  const [selected, setSelected] = useState(todayIso());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const dayEvents = events.filter((e) => e.date === selected).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="cal-wrap">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Workspace calendar</p>
            <h2>{format(cursor, "MMMM yyyy")}</h2>
          </div>
          <div className="heading-actions">
            <button className="icon-button" aria-label="Previous month" onClick={() => setCursor((d) => addMonths(d, -1))}>
              <ChevronLeft size={18} />
            </button>
            <button className="icon-button" aria-label="Next month" onClick={() => setCursor((d) => addMonths(d, 1))}>
              <ChevronRight size={18} />
            </button>
            <button className="button-primary" onClick={onCreate}>
              <Plus size={16} /> Event
            </button>
          </div>
        </div>
        <div className="cal-grid" style={{ marginTop: 16 }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div className="cal-dow" key={d}>
              {d}
            </div>
          ))}
          {days.map((day) => {
            const iso = format(day, "yyyy-MM-dd");
            const items = events.filter((e) => e.date === iso);
            const muted = !isSameMonth(day, cursor);
            const today = isSameDay(day, new Date());
            return (
              <button
                key={iso}
                className={`cal-day${muted ? " muted" : ""}${today ? " today" : ""}${iso === selected ? " selected" : ""}`}
                onClick={() => setSelected(iso)}
              >
                <strong>{format(day, "d")}</strong>
                {items.slice(0, 2).map((e) => (
                  <span key={e.id} className={`cal-pip${e.kind === "external" ? " external" : ""}`}>
                    {e.title}
                  </span>
                ))}
                {items.length > 2 && <span className="cal-pip">+{items.length - 2}</span>}
              </button>
            );
          })}
        </div>
      </section>
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Selected day</p>
            <h2>{format(new Date(selected + "T12:00:00"), "EEEE d MMM")}</h2>
          </div>
        </div>
        <div className="day-list">
          {dayEvents.length === 0 && <p className="heading-note">Nothing booked. Add an event to this day.</p>}
          {dayEvents.map((e) => (
            <div className="day-event" key={e.id}>
              <strong>
                {e.time} · {e.title}
              </strong>
              <span>
                {e.kind === "external" ? "External" : "Internal"}
                {e.location ? ` · ${e.location}` : ""}
              </span>
              <div className="row-actions" style={{ marginTop: 8 }}>
                <button
                  className="icon-button"
                  aria-label={`Delete ${e.title}`}
                  onClick={() => {
                    removeEvent(e.id);
                    toast.success("Event removed");
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
