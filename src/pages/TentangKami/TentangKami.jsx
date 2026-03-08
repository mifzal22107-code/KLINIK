import useSEO from "../../hooks/useSEO";
import { useInView } from "../../hooks/useInView";
import { useRef, useCallback } from "react";
import "./TentangKami.css";

const profilParagraphs = [
  "Rumah Sehat Haji Irawan adalah tempat pengobatan alternatif yang fokus pada satu jenis terapi yaitu totok punggung.",
  "Tgl. 6 Januari 2026 adalah Milad ke-1 tahun memberikan pelayanan kesehatan tradisional kepada masyarakat umum dan khususnya warga domisili Batam Kota.",
  "Berdirinya Rumah Sehat ini atas inisiatif Haji Irawan, sejak rutin menjalani terapi totok punggung pasca terkena serangan stroke di bulan November 2024, dengan izin Allah Subhanahu wa Ta'ala diberikan kesembuhan dan kesehatan seperti sedia kala.",
  "Untuk memenuhi syarat administrasi Komunitas Totok Punggung Indonesia, Haji Irawan bersama istrinya Desi Fatmawati kemudian mengikuti kelas pelatihan tingkat Dasar, Pendalaman hingga standarisasi di Kota Batam, saat itu di bimbing langsung Founder/Master Totok Punggung Indonesia Ust. Abdurrachman dari Bekasi.",
  "Sebagai bentuk rasa syukur, keinginan mendirikan Rumah Sehat ini bertujuan membantu masyarakat untuk sehat alami tanpa obat terutama bagi masyarakat tidak mampu.",
  "Haji Irawan kemudian menunjuk Awaluddin sebagai penanggungjawab sekaligus pengelola Rumah Sehat yang akan dirintis, saat itu dibantu beberapa alumni terapis totok punggung domisili Batam Kota seperti Ahmad Rismanto, Nyai Sumiati, Yanti, Silvi, Bidan Eva, Jefry, Tri dan beberapa tim lainnya, bertempat di Ruko Bida Asri 2 No 12A Batam Kota.",
];

const strukturData = [
  { label: "Owner", value: "H. Irawan" },
  { label: "Direktur", value: "Desi Fatmawati" },
  { label: "Kepala Terapis", value: "Awaluddin, S.Pd.I" },
  { label: "Adm & Keuangan", value: "Silviani Mulia" },
];
const terapisNames = ["Jefry", "Samsuddin", "Ansar", "Yanti", "Eva Siska", "Helvi Astuti", "Rani Yuli Astuti"];

const programBulanan = [
  "Rapat tim akhir bulan",
  "Pengajian",
  "Baksos totok punggung melalui komunitas",
];
const programTahunan = [
  "Perayaan hari besar Islam",
  "Perayaan hari besar nasional",
  "Family gathering akhir tahun",
  "Santunan yatim ramadhan",
  "Baksos totok punggung sambut ramadhan",
];
const kegiatanKeummatan = [
  "Ikut serta dalam kegiatan bakti sosial totok punggung kepada masyarakat umum yang diselenggarakan komunitas Totok Punggung Batam",
  "Berbagi ta'jil bulan ramadhan",
  "Topung istimewa - memberikan layanan gratis totok punggung ke rumah-rumah warga kurang mampu",
  "Pengajian rutin bulanan terapis",
];
const kunjunganInstansi = [
  "Kunjungan Tim Puskesmas Batam Kota di Rumah Sehat Haji Irawan",
  "Kunjungan Tim Hatra Dinas Kesehatan Kota Batam di Rumah Sehat Haji Irawan",
  "Kunjungan Bupati Pesisir Selatan sekaligus mencoba totok punggung di Rumah Sehat Haji Irawan",
  "2 kali kunjungan Ust. Abdurrachman di Rumah Sehat Haji Irawan bersama pengurus Wilayah dan Daerah Totok Punggung",
];

export default function TentangKami() {
  useSEO({ title: "Tentang Kami", description: "Kenali sejarah dan perjalanan Rumah Sehat Totok Punggung Haji Irawan (RSHI). Mulai dari kisah penyembuhan stroke hingga klinik terapi terpercaya di Indonesia." });
  const [s1Ref, s1InView] = useInView({ threshold: 0.1 });
  const [s2Ref, s2InView] = useInView({ threshold: 0.1 });
  const [s3Ref, s3InView] = useInView({ threshold: 0.1 });
  const [lisensiRef, lisensiInView] = useInView({ threshold: 0.1 });

  const photoCardRef = useRef(null);
  const glowRef = useRef(null);
  const sparksContainerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = photoCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(900px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) scale(1.04)`;
    if (glowRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(212,168,83,0.35) 0%, transparent 65%)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const container = sparksContainerRef.current;
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement("span");
      spark.className = "tk-spark";
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${Math.random() * 100}%`;
      spark.style.animationDelay = `${Math.random() * 0.6}s`;
      const size = `${4 + Math.random() * 6}px`;
      spark.style.width = size;
      spark.style.height = size;
      container.appendChild(spark);
      setTimeout(() => spark.remove(), 1400);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = photoCardRef.current;
    if (card) card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }, []);

  return (
    <div className="tk-page">

      {/* ===== SLIDE 1: PROFIL SINGKAT ===== */}
      <section className="tk-slide-1">
        <div className="tk-s1-inner">
          <div ref={s1Ref} className={`tk-s1-text-block animate-on-scroll slide-up ${s1InView ? "in-view" : ""}`}>
            <h1 className="tk-h1">Profil Singkat</h1>
            {profilParagraphs.map((para, i) => (
              <p key={i} className="tk-s1-desc">{para}</p>
            ))}
            <span className="tk-owner-label-side">Owner : H. Irawan</span>
          </div>

          <div className="tk-s1-photo-col">
            <div className="tk-ring tk-ring-1" />
            <div className="tk-ring tk-ring-2" />
            <div className="tk-ring tk-ring-3" />
            <div
              className="tk-photo-card"
              ref={photoCardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="tk-photo-glow" ref={glowRef} />
              <div className="tk-photo-shimmer" />
              <div className="tk-sparks-container" ref={sparksContainerRef} />
              <div className="tk-badge"> Owner</div>
              <img
                src="/images/owner-haji-irawan.png"
                alt="Owner: Haji Irawan"
                className="tk-owner-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=Haji+Irawan&background=D4A853&color=0F1A14&size=600";
                }}
              />
              <div className="tk-photo-name-overlay">
                <span>H. Irawan</span>
                <small>Founder &amp; Owner RSHI</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SLIDE 2: PROFIL PERUSAHAAN ===== */}
      <section className="tk-slide-2">
        <div className="container">
          <h2 ref={s2Ref} className={`tk-h2 animate-on-scroll slide-up ${s2InView ? "in-view" : ""}`}>
            Profil Perusahaan
          </h2>

          {/* Identity Card */}
          <div className={`tk-company-identity animate-on-scroll slide-up delay-1 ${s2InView ? "in-view" : ""}`}>
            <div className="tk-identity-left">
              <div className="tk-identity-badge"><img src="/images/logo-header.jpg" alt="RSHI Logo" style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"12px"}} /></div>
              <div>
                <h3 className="tk-company-name">Rumah Sehat Haji Irawan</h3>
                <span className="tk-nib">NIB: 0402250114275</span>
              </div>
            </div>
            <div className="tk-identity-right">
              <div className="tk-info-pill">
                <span className="tk-pill-label">Jenis Usaha</span>
                <span className="tk-pill-value">Terapi Totok Punggung</span>
              </div>
              <div className="tk-info-pill">
                <span className="tk-pill-label">Motto</span>
                <span className="tk-pill-value tk-motto">Sehat Berdaya Sejahtera</span>
              </div>
              <div className="tk-info-pill">
                <span className="tk-pill-label">Konsep</span>
                <span className="tk-pill-value">Berbasis Kekeluargaan &amp; Bagi Hasil</span>
              </div>
            </div>
          </div>

          {/* Contact Strip */}
          <div className={`tk-contact-strip animate-on-scroll slide-up delay-2 ${s2InView ? "in-view" : ""}`}>
            <div className="tk-contact-item">
              <span className="tk-contact-icon"></span>
              <span>Ruko Bida Asri 2 No. 12A, Jl. Raja Ali Kelana, Batam Kota</span>
            </div>
            <div className="tk-contact-divider" />
            <div className="tk-contact-item">
              <span className="tk-contact-icon"></span>
              <a href="https://wa.me/6287794940975" className="tk-contact-link">+62 877-9494-0975</a>
            </div>
          </div>

          {/* Visi Misi */}
          <div className={`tk-visi-card animate-on-scroll slide-up delay-3 ${s2InView ? "in-view" : ""}`}>
            <div className="tk-visi-icon"></div>
            <div>
              <h4 className="tk-visi-title">Visi &amp; Misi</h4>
              <p className="tk-visi-text">Membantu pemerintah kota Batam dalam menyehatkan masyarakat dengan terapi Totok Punggung.</p>
            </div>
          </div>

          {/* Struktur Manajemen */}
          <div ref={s3Ref} className="tk-section-title-row">
            <span className={`tk-section-tag animate-on-scroll slide-up ${s3InView ? "in-view" : ""}`}>Struktur Manajemen</span>
          </div>
          <div className="tk-struktur-grid">
            {strukturData.map((item, i) => (
              <div key={i} className={`tk-struktur-card animate-on-scroll slide-up delay-${i + 1} ${s3InView ? "in-view" : ""}`}>
                <span className="tk-struktur-label">{item.label}</span>
                <span className="tk-struktur-value">{item.value}</span>
              </div>
            ))}
            <div className={`tk-struktur-card tk-terapis-card animate-on-scroll slide-up delay-${strukturData.length + 1} ${s3InView ? "in-view" : ""}`}>
              <span className="tk-struktur-label">Tenaga Terapis</span>
              <div className="tk-terapis-tags">
                {terapisNames.map((t, i) => (
                  <span key={i} className="tk-terapis-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Program */}
          <div className="tk-section-title-row">
            <span className={`tk-section-tag animate-on-scroll slide-up ${s3InView ? "in-view" : ""}`}>Program Kegiatan</span>
          </div>
          <div className="tk-program-grid">
            <div className={`tk-program-card animate-on-scroll slide-up delay-1 ${s3InView ? "in-view" : ""}`}>
              <div className="tk-program-header">
                <span className="tk-program-icon"></span>
                <h4>Program Bulanan</h4>
              </div>
              <ul className="tk-program-list">
                {programBulanan.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className={`tk-program-card animate-on-scroll slide-up delay-2 ${s3InView ? "in-view" : ""}`}>
              <div className="tk-program-header">
                <span className="tk-program-icon"></span>
                <h4>Program Tahunan</h4>
              </div>
              <ul className="tk-program-list">
                {programTahunan.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>

          {/* Kegiatan 1 Tahun */}
          <div className="tk-section-title-row">
            <span className={`tk-section-tag animate-on-scroll slide-up ${s3InView ? "in-view" : ""}`}>Kegiatan 1 Tahun Berjalan 2025</span>
          </div>

          <div className={`tk-kegiatan-ribbon animate-on-scroll slide-up delay-1 ${s3InView ? "in-view" : ""}`}>
            <span className="tk-kegiatan-dot" />
            <p>Syukuran pendirian Rumah Sehat</p>
          </div>

          <div className={`tk-kegiatan-block animate-on-scroll slide-up delay-2 ${s3InView ? "in-view" : ""}`}>
            <h5 className="tk-kegiatan-subtitle">Kegiatan Keummatan</h5>
            <div className="tk-kegiatan-list">
              {kegiatanKeummatan.map((k, i) => (
                <div key={i} className="tk-kegiatan-item">
                  <span className="tk-kegiatan-num">{i + 1}</span>
                  <p>{k}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`tk-kegiatan-block animate-on-scroll slide-up delay-3 ${s3InView ? "in-view" : ""}`}>
            <h5 className="tk-kegiatan-subtitle">Kunjungan Instansi</h5>
            <div className="tk-kegiatan-list">
              {kunjunganInstansi.map((k, i) => (
                <div key={i} className="tk-kegiatan-item">
                  <span className="tk-kegiatan-num">{i + 1}</span>
                  <p>{k}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`tk-klien-highlight animate-on-scroll slide-up delay-4 ${s3InView ? "in-view" : ""}`}>
            <div className="tk-klien-number">4.320</div>
            <div className="tk-klien-text">
              <strong>Kunjungan Klien</strong>
              <span>di Rumah Sehat Haji Irawan sepanjang tahun 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SLIDE 3: LISENSI IZIN USAHA ===== */}
      <section className="tk-slide-3">
        <div className="container">
          <h2 ref={lisensiRef} className={`tk-h2 animate-on-scroll slide-up ${lisensiInView ? "in-view" : ""}`}>
            Lisensi Izin Usaha
          </h2>
          <div className="tk-lisensi-grid">
            <div className={`tk-lisensi-card animate-on-scroll zoom-in delay-1 ${lisensiInView ? "in-view" : ""}`}>
              <div className="tk-lisensi-img-wrap">
                <img src="/images/surat-izin-pemerintah.jpg" alt="Surat Izin Pemerintah 2024"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/380x540/f0f5f2/1B6B4A?text=Surat+Izin+Pemerintah+2024"; }} />
              </div>
              <p className="tk-lisensi-caption">surat izin pemerintah tahun 2024</p>
            </div>
            <div className={`tk-lisensi-card animate-on-scroll zoom-in delay-3 ${lisensiInView ? "in-view" : ""}`}>
              <div className="tk-lisensi-img-wrap">
                <img src="/images/surat-izin-disnakes.jpg" alt="Surat Izin Disnakes 2024"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/380x540/f0f5f2/1B6B4A?text=Surat+Izin+Disnakes+2024"; }} />
              </div>
              <p className="tk-lisensi-caption">surat izin disnakes tahun 2024</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

