import { Link } from "react-router-dom";
import { Users, CalendarCheck } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Floating decorative orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title fade-in-up" style={{ animationDelay: "0s" }}>
            RUMAH SEHAT <span>TOTOK PUNGGUNG</span> HAJI IRAWAN
          </h1>
          <p className="hero-subtitle fade-in-up" style={{ animationDelay: "0.2s" }}>
            Solusi kesehatan tradisional Indonesia yang autentik dan terpercaya.
            Temukan kembali keseimbangan tubuh dan pikiran Anda.
          </p>
          <div className="hero-cta fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/terapis" className="btn btn-outline">
              <Users size={20} /> Lihat Terapis
            </Link>
            <Link to="/booking" className="btn btn-primary">
              <CalendarCheck size={20} /> Booking Sekarang
            </Link>
          </div>

          {/*  Kunjungan Klien Highlight  */}
          <div className="hero-klien-highlight fade-in-up" style={{ animationDelay: "0.65s" }}>
            <div className="hero-klien-badge">
              <img src="/images/logo-header.jpg" alt="RSHI Logo" />
            </div>
            <div className="hero-klien-content">
              <div className="hero-klien-number">4.320</div>
              <div className="hero-klien-text">
                <strong>Kunjungan Klien</strong>
                <span>di Rumah Sehat Haji Irawan sepanjang tahun 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


