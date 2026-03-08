import { Activity, Droplets, Brain, MoonStar } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import "./ManfaatSection.css";

export default function ManfaatSection() {
  const [headerRef, headerInView] = useInView();
  const [gridRef, gridInView] = useInView({ threshold: 0.1 });

  const manfaatData = [
    { icon: <Activity size={32} />, title: "Meredakan Nyeri",       desc: "Mengurangi rasa nyeri pada otot dan sendi secara efektif." },
    { icon: <Droplets size={32} />, title: "Lancar Aliran Darah",   desc: "Meningkatkan sirkulasi darah untuk kesehatan optimal." },
    { icon: <Brain size={32} />,    title: "Kurangi Stres",          desc: "Menenangkan sistem saraf dan melepaskan ketegangan." },
    { icon: <MoonStar size={32} />, title: "Kualitas Tidur",        desc: "Membantu tubuh rileks untuk tidur lebih nyenyak." },
  ];

  return (
    <section className="section manfaat-section">
      <div className="container">
        <div
          ref={headerRef}
          className={`manfaat-header animate-on-scroll slide-up ${headerInView ? "in-view" : ""}`}
        >
          <h2 className="manfaat-title">Manfaat Totok Punggung</h2>
          <p className="manfaat-subtitle">Rasakan perubahan nyata dalam kesehatan Anda</p>
        </div>
        <div ref={gridRef} className="manfaat-grid">
          {manfaatData.map((item, index) => (
            <div
              key={index}
              className={`manfaat-card animate-on-scroll zoom-in delay-${index + 1} ${gridInView ? "in-view" : ""}`}
            >
              <div className="manfaat-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="manfaat-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
