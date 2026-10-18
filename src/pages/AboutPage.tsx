type Member = {
  id: number;
  name: string;
  number: string;
  role: string;
};

// TODO: fill in each member's role
const MEMBERS: Member[] = [
  { id: 1, name: "นายกิตติคุณ อาแว", number: "1660704998", role: "Backend" },
  { id: 2, name: "นายธนโชติ ธนาวิวัฒน์สกุล", number: "1660705011", role: "Backend + Frontend" },
  { id: 3, name: "นายชนุดม ศรีสุข", number: "1660701747", role: "Frontend" },
];

const TECH_STACK = [
  "React 19",
  "TypeScript",
  "Vite",
  "React Router v8",
  "TanStack Query v5",
  "Zustand",
  "Tailwind CSS + DaisyUI",
  "JSON Server",
];

export function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">เกี่ยวกับโครงงาน</h1>
        <p className="max-w-3xl text-base-content/70">
          รวมบริการสุขภาพไว้ในเว็บเดียว ให้ค้นหา เลือกเวลาว่าง จอง
          และจัดการนัดหมายได้ในที่เดียว พร้อมแบบประเมินช่วยแนะนำบริการที่เหมาะ
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">สมาชิก</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-4"
            >
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-base-300 text-sm text-primary"
              >
                {member.id}
              </span>
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-base-content/60">{member.number}</p>
                <p className="text-sm text-base-content/60">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">เทคโนโลยี</h2>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
