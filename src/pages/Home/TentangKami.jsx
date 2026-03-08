import { useInView } from "../../hooks/useInView";
import "./TentangKami.css";

export default function TentangKami() {
  const [textRef, textInView] = useInView();
  const [imgRef, imgInView] = useInView();

  return (
    <section id="tentang-kami" className="section tentang-kami">
      <div className="container">
        <div className="tentang-grid">
          <div
            ref={textRef}
            className={`tentang-content animate-on-scroll slide-left ${textInView ? "in-view" : ""}`}
          >
            <h2 className="section-title">Tentang Kami</h2>
            <p className="tentang-text">
              Perkenalkan, kami hadir untuk membawa solusi kesehatan tradisional Indonesia yang
              autentik dan terpercaya: Totok Punggung.
            </p>
            <p className="tentang-text">
              Usaha kami hadir dengan legalitas yang jelas dan bertanggung jawab. Kami telah
              mengantongi perizinan resmi dari Pemerintah serta Dinas Ketenagakerjaan (Disnaker),
              memastikan bahwa setiap layanan yang kami berikan tidak hanya profesional, tetapi
              juga aman dan diakui secara hukum.
            </p>
          </div>
          <div
            ref={imgRef}
            className={`tentang-image animate-on-scroll slide-right delay-2 ${imgInView ? "in-view" : ""}`}
          >
            <div className="logo-circle">
              <div className="logo-inner" style={{ width: "100%", height: "100%", padding: "10px" }}>
                <img
                  src="/images/logo.jpg"
                  alt="Logo Totok Punggung Haji Irawan"
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
