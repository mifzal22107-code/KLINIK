import useSEO from '../../hooks/useSEO';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Clock, Award, User, Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { supabase } from "../../config/supabaseClient";
import "./Terapis.css";

export default function Terapis() {
    useSEO({ title: 'Tim Terapis', description: 'Kenali tim terapis profesional dan berpengalaman RSHI. Setiap terapis tersertifikasi siap membantu memulihkan kesehatan Anda.' });
    const [headerRef, headerInView] = useInView();
    const [gridRef, gridInView] = useInView({ threshold: 0.1 });
    const navigate = useNavigate();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTerapis, setSelectedTerapis] = useState(null);
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const terapisData = [
        { id: 1, kode: "irawan", name: "Haji Irawan", role: "Master Terapis", exp: "15+ Tahun", rating: 5.0, image: null },
        { id: 2, kode: "ahmad", name: "Ahmad Faisal", role: "Terapis Senior", exp: "8 Tahun", rating: 4.9, image: null },
        { id: 3, kode: "budi", name: "Budi Santoso", role: "Terapis", exp: "5 Tahun", rating: 4.8, image: null },
        { id: 4, kode: "syam", name: "Pak Syam", role: "Terapis", exp: "1 Tahun", rating: 4.8, image: "/images/terapis-syam.jpg" },
    ];

    const timeSlots = ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'];

    const getDatesForWeek = () => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDay = new Date(today);
        startDay.setDate(today.getDate() + (currentWeekOffset * 7));

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDay);
            date.setDate(startDay.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const fetchSchedule = async (terapisKode, startDate, endDate) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('booking')
                .select('tanggal, jam')
                .eq('kode_terapis', terapisKode)
                .gte('tanggal', startDate)
                .lte('tanggal', endDate);

            if (error) throw error;
            setBookedSlots(data || []);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isModalOpen && selectedTerapis) {
            const dates = getDatesForWeek();
            const startStr = formatDateForDB(dates[0]);
            const endStr = formatDateForDB(dates[6]);
            fetchSchedule(selectedTerapis.kode, startStr, endStr);
        }
    }, [isModalOpen, selectedTerapis, currentWeekOffset]);

    const openModal = (terapis) => {
        setSelectedTerapis(terapis);
        setCurrentWeekOffset(0);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTerapis(null);
        document.body.style.overflow = 'auto';
    };

    const nextWeek = () => setCurrentWeekOffset(prev => prev + 1);
    const prevWeek = () => setCurrentWeekOffset(prev => Math.max(0, prev - 1));

    const formatDateForDB = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const isSlotBooked = (dateStr, time) => {
        return bookedSlots.some(slot => slot.tanggal === dateStr && slot.jam === time);
    };

    const isPastSlot = (date, time) => {
        const now = new Date();
        const slotDate = new Date(date);

        const [hours, minutes] = time.split(':').map(Number);
        slotDate.setHours(hours, minutes, 0, 0);

        return false; // User requested all slots open for today
    };

    const handleSlotClick = (terapisKode, dateStr, timeStr) => {
        document.body.style.overflow = 'auto';
        setIsModalOpen(false);
        navigate(`/booking?terapis=${terapisKode}&tanggal=${dateStr}&jam=${timeStr}`);
    };

    return (
        <div className="terapis-page">
            <div className="container">
                <div
                    ref={headerRef}
                    className={`page-header animate-on-scroll slide-up ${headerInView ? "in-view" : ""}`}
                >
                    <h1 className="page-title">Daftar Terapis Kami</h1>
                    <p className="page-subtitle">
                        Pilih terapis profesional dan berpengalaman kami yang siap membantu memulihkan kesehatan Anda.
                    </p>
                </div>

                <div ref={gridRef} className="terapis-grid">
                    {terapisData.map((terapis, index) => (
                        <div
                            key={terapis.id}
                            className={`terapis-card animate-on-scroll slide-up delay-${index + 1} ${gridInView ? "in-view" : ""}`}
                        >
                            <div className="terapis-img">
                                {terapis.image ? (
                                    <img src={terapis.image} alt={terapis.name} />
                                ) : (
                                    <User size={64} />
                                )}
                            </div>
                            <div className="terapis-info">
                                <h3 className="terapis-name">{terapis.name}</h3>
                                <span className="terapis-role">{terapis.role}</span>
                                <div className="terapis-meta">
                                    <Award size={16} />
                                    <span>Pengalaman: {terapis.exp}</span>
                                </div>
                                <div className="terapis-meta">
                                    <Star size={16} fill="var(--accent)" color="var(--accent)" />
                                    <span>Rating: {terapis.rating}/5.0</span>
                                </div>
                                <div className="terapis-action" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <button
                                        className="btn btn-outline"
                                        style={{ flex: 1, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                                        onClick={() => openModal(terapis)}
                                    >
                                        <CalendarIcon size={16} /> Jadwal
                                    </button>
                                    <Link to={`/booking?terapis=${terapis.kode}`} className="btn btn-primary" style={{ flex: 1, padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                        Booking
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Schedule Modal */}
            {isModalOpen && selectedTerapis && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container schedule-modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>
                            <X size={24} />
                        </button>

                        <div className="schedule-header">
                            <h3>Jadwal {selectedTerapis.name}</h3>
                            <p>Pilih jam yang tersedia untuk melihat dan memesan jadwal.</p>
                        </div>

                        <div className="schedule-controls">
                            <button
                                className="nav-week-btn"
                                onClick={prevWeek}
                                disabled={currentWeekOffset === 0}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="week-label">Minggu ke-{currentWeekOffset + 1}</div>
                            <button
                                className="nav-week-btn"
                                onClick={nextWeek}
                                disabled={currentWeekOffset >= 4}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="schedule-table-wrapper">
                            {isLoading ? (
                                <div className="loading-indicator">Memuat jadwal Supabase...</div>
                            ) : (
                                <table className="schedule-table">
                                    <thead>
                                        <tr>
                                            <th>Jam</th>
                                            {getDatesForWeek().map((date, i) => (
                                                <th key={i} className={date.toDateString() === new Date().toDateString() ? 'today-col' : ''}>
                                                    <div className="date-header">
                                                        <span className="date-day">{date.toLocaleDateString('id-ID', { weekday: 'short' })}</span>
                                                        <span className="date-num">{date.getDate()}/{date.getMonth() + 1}</span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map((time, timeIdx) => (
                                            <tr key={timeIdx}>
                                                <td className="time-col">{time}</td>
                                                {getDatesForWeek().map((date, dateIdx) => {
                                                    const dateStr = formatDateForDB(date);
                                                    const isBooked = isSlotBooked(dateStr, time);
                                                    const isPast = isPastSlot(date, time);
                                                    const isAvailable = !isBooked && !isPast;

                                                    return (
                                                        <td key={`${dateIdx}-${timeIdx}`} className="slot-col">
                                                            <div
                                                                className={`slot-box ${isPast ? 'slot-past' : isBooked ? 'slot-booked' : 'slot-available'}`}
                                                                onClick={() => isAvailable && handleSlotClick(selectedTerapis.kode, dateStr, time)}
                                                                title={isAvailable ? 'Klik untuk Booking' : isBooked ? 'Sudah Full' : ''}
                                                            >
                                                                {isPast ? '-' : (isBooked ? 'Full' : 'Pilih')}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="schedule-legend">
                            <div className="legend-item"><span className="legend-color available"></span> Tersedia</div>
                            <div className="legend-item"><span className="legend-color booked"></span> Full dipesan</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
