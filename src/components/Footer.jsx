import { Phone, Globe, Clock, Calendar, Facebook, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 className="footer-title">Kontak</h4>
            <div className="footer-item">
              <Phone size={18} />
              <span>0822 8689 1995</span>
            </div>
            <div className="footer-item">
              <Globe size={18} />
              <span>RSHI.com</span>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Jam Operasional</h4>
            <div className="footer-item">
              <Calendar size={18} />
              <span>08:00 - 17:00</span>
            </div>
            <div className="footer-item">
              <Clock size={18} />
              <span>08:00 - 12:00</span>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Ikuti Kami</h4>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          &copy; 2024 Rumah Sehat Totok Punggung Haji Irawan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
