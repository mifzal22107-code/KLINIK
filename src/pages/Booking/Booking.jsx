import useSEO from '../../hooks/useSEO';
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { supabase } from "../../config/supabaseClient";
import "./Booking.css";

export default function Booking() {
    useSEO({ title: 'Booking Terapi', description: 'Jadwalkan sesi terapi totok punggung Anda di RSHI. Pilih terapis, tentukan waktu, dan isi data diri dengan mudah secara online.' });
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [direction, setDirection] = useState("forward");

    const [searchParams] = useSearchParams();

    // Form State
    const [terapis, setTerapis] = useState(searchParams.get('terapis') || "");
    const [keluhan, setKeluhan] = useState("");
    const [tanggal, setTanggal] = useState(searchParams.get('tanggal') || "");
    const [jam, setJam] = useState(searchParams.get('jam') || "");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [noWa, setNoWa] = useState("");
    const [alamat, setAlamat] = useState("");

    const [bookedSlots, setBookedSlots] = useState([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'auto'; // GUARANTEE SCROLL UNLOCK ON MOUNT
        if (terapis && tanggal) {
            const fetchBookedSlots = async () => {
                setIsLoadingSlots(true);
                try {
                    const { data, error } = await supabase
                        .from('booking')
                        .select('jam')
                        .eq('kode_terapis', terapis)
                        .eq('tanggal', tanggal);

                    if (error) throw error;

                    setBookedSlots(data.map(slot => slot.jam));
                } catch (error) {
                    console.error("Error fetching booked slots:", error);
                } finally {
                    setIsLoadingSlots(false);
                }
            };
            fetchBookedSlots();
        } else {
            setBookedSlots([]);
        }
    }, [terapis, tanggal]);

    const [containerRef, containerInView] = useInView({ threshold: 0.1 });

    const nextStep = () => { setDirection("forward"); setStep(s => Math.min(s + 1, 3)); };
    const prevStep = () => { setDirection("back"); setStep(s => Math.max(s - 1, 1)); };

    const submitForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const { error } = await supabase
                .from('booking')
                .insert([
                    {
                        kode_terapis: terapis,
                        keluhan: keluhan,
                        tanggal: tanggal,
                        jam: jam,
                        nama_lengkap: namaLengkap,
                        no_wa: noWa,
                        alamat: alamat
                    }
                ])
                .select();

            if (error) {
                console.error("Supabase insert error:", error);
                throw error;
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting booking:', error);
            setSubmitError("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="booking-page">
                <div className="container">
                    <div className="booking-container success-slide-in">
                        <div className="success-message">
                            <div className="success-icon">
                                <CheckCircle size={40} />
                            </div>
                            <h2>Booking Berhasil!</h2>
                            <p>Terima kasih. Jadwal Terapi Anda telah berhasil dipesan. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.</p>
                            <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="container">
                <div
                    ref={containerRef}
                    className={'booking-container animate-on-scroll slide-up ' + (containerInView ? 'in-view' : '')}
                >
                    <div className="booking-header">
                        <h1>Reservasi Jadwal</h1>
                        <p>Silakan lengkapi formulir di bawah ini untuk mengatur jadwal terapi Anda.</p>
                    </div>

                    <div className="booking-steps">
                        {[1, 2, 3].map(item => (
                            <div key={item} className={'step-item ' + (step === item ? 'active' : '') + ' ' + (step > item ? 'completed' : '')}>
                                <div className="step-circle">
                                    {step > item ? <Check size={16} /> : item}
                                </div>
                                <span className="step-label">
                                    {item === 1 ? "Pilih Layanan" : item === 2 ? "Tentukan Waktu" : "Data Diri"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={step === 3 ? submitForm : (e) => { e.preventDefault(); nextStep(); }}>
                        <div className="booking-form">
                            {step === 1 && (
                                <div key="step1" className={'step-panel ' + (direction === 'forward' ? 'step-enter' : 'step-enter-back')}>
                                    <div className="form-group">
                                        <label>Pilih Terapis</label>
                                        <select required value={terapis} onChange={(e) => setTerapis(e.target.value)}>
                                            <option value="" disabled>-- Pilih Terapis --</option>
                                            <option value="ahmad">Ahmad Faisal</option>
                                            <option value="budi">Budi Santoso</option>
                                            <option value="syam">Pak Syam</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Keluhan Utama</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Ceritakan keluhan fisik atau kesehatan Anda..."
                                            required
                                            value={keluhan}
                                            onChange={(e) => setKeluhan(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div key="step2" className={'step-panel ' + (direction === 'forward' ? 'step-enter' : 'step-enter-back')}>
                                    <div className="form-group">
                                        <label>Tanggal Booking</label>
                                        <input
                                            type="date"
                                            required
                                            value={tanggal}
                                            onChange={(e) => setTanggal(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Jam Kunjungan</label>
                                        <select required value={jam} onChange={(e) => setJam(e.target.value)}>
                                            <option value="" disabled>-- Pilih Jam --</option>
                                            {[
                                                { val: "08:00", label: "08:00 - 09:00 WIB" },
                                                { val: "09:00", label: "09:00 - 10:00 WIB" },
                                                { val: "10:00", label: "10:00 - 11:00 WIB" },
                                                { val: "13:00", label: "13:00 - 14:00 WIB" },
                                                { val: "14:00", label: "14:00 - 15:00 WIB" },
                                                { val: "15:00", label: "15:00 - 16:00 WIB" }
                                            ].map(slot => (
                                                <option
                                                    key={slot.val}
                                                    value={slot.val}
                                                    disabled={bookedSlots.includes(slot.val)}
                                                    style={bookedSlots.includes(slot.val) ? { color: '#999' } : {}}
                                                >
                                                    {slot.label} {bookedSlots.includes(slot.val) ? '(Penuh)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        {isLoadingSlots && <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '5px' }}>Memeriksa ketersediaan jam...</p>}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div key="step3" className={'step-panel ' + (direction === 'forward' ? 'step-enter' : 'step-enter-back')}>
                                    {submitError && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{submitError}</div>}
                                    <div className="form-group">
                                        <label>Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan nama lengkap Anda"
                                            required
                                            value={namaLengkap}
                                            onChange={(e) => setNamaLengkap(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nomor WhatsApp</label>
                                        <input
                                            type="tel"
                                            placeholder="Contoh: 081234567890"
                                            required
                                            pattern="[0-9]+"
                                            value={noWa}
                                            onInput={(e) => {
                                                const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                                                setNoWa(onlyDigits);
                                            }}
                                            title="Nomor WhatsApp hanya boleh berisi angka"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Lengkap</label>
                                        <textarea
                                            rows="2"
                                            placeholder="Masukkan alamat domisili Anda"
                                            required
                                            value={alamat}
                                            onChange={(e) => setAlamat(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="booking-actions">
                            {step > 1 ? (
                                <button type="button" className="btn btn-outline" onClick={prevStep} disabled={isSubmitting}>
                                    <ArrowLeft size={18} /> Sebelumnya
                                </button>
                            ) : (
                                <div></div>
                            )}
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {step === 3
                                    ? (isSubmitting ? "Menyimpan Data..." : "Selesaikan Booking")
                                    : "Selanjutnya"} {step < 3 && <ArrowRight size={18} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
