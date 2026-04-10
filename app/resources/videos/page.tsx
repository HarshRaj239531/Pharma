"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    Play, Pause, Volume2, VolumeX, Maximize,
    Sparkles, ArrowRight, Zap, PlayCircle, MonitorPlay,
    UserCircle, CheckCircle2
} from "lucide-react";

// --- ⚡ BACKEND SE AANE WALA MULTIPLE VIDEOS DATA ---
const backendVideos = [
    {
        id: "vid1",
        title: "Platform Overview & Core Features",
        description: "A complete walkthrough of our main dashboard and core capabilities to get you started quickly.",
        duration: "2:15",
        instructor: "Sarah Drasner",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: "vid2",
        title: "Advanced Workflow Automation",
        description: "Learn how to save hours by automating repetitive tasks and chaining actions together.",
        duration: "3:42",
        instructor: "David Miller",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: "vid3",
        title: "Team Collaboration Setup",
        description: "Invite your team, set up granular role-based permissions, and manage access securely.",
        duration: "1:50",
        instructor: "Sarah Drasner",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: "vid4",
        title: "Analytics & Custom Reporting",
        description: "Dive deep into your data with our powerful analytics engine and export custom reports.",
        duration: "4:05",
        instructor: "Emily Chen",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
    }
];

// --- ⚡ ULTRA-PREMIUM AMBIENT BACKGROUND ---
function PremiumBackground() {
    const auraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (auraRef.current) {
                auraRef.current.style.setProperty("--x", `${mouseX}px`);
                auraRef.current.style.setProperty("--y", `${mouseY}px`);
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fafcff]">
            {/* Extremely subtle dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_40%,transparent_100%)]" />

            {/* Soft Pastel Orbs */}
            <div className="absolute top-[-20%] right-[5%] w-[800px] h-[800px] rounded-full bg-sky-200/40 blur-[160px] animate-[blob-pulse_12s_ease-in-out_infinite]" />
            <div className="absolute top-[20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-indigo-100/40 blur-[140px] animate-[blob-pulse_10s_ease-in-out_infinite_1s]" />

            {/* Dynamic Mouse Aura */}
            <div
                ref={auraRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/80 rounded-full blur-[100px] will-change-transform hidden lg:block pointer-events-none"
                style={{
                    transform: 'translate3d(calc(var(--x, 50vw) - 50%), calc(var(--y, 50vh) - 50%), 0)',
                    transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            />
        </div>
    );
}

// --- ⚡ TIME FORMATTER UTILITY ---
const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// --- ⚡ MAIN COMPONENT ---
export default function App() {
    const [videos, setVideos] = useState(backendVideos);
    const [activeVideo, setActiveVideo] = useState(backendVideos[0]);

    // Video Player States
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
    const [durationStr, setDurationStr] = useState(activeVideo.duration);

    const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

    // Handle video source change
    useEffect(() => {
        setIsPlaying(false);
        setShowControls(true);
        setProgress(0);
        setCurrentTimeStr("0:00");
        setDurationStr(activeVideo.duration); // Set initial mock duration

        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [activeVideo]);

    // Handle video progress update
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
        setCurrentTimeStr(formatTime(videoRef.current.currentTime));

        // Update real duration once metadata is loaded
        if (videoRef.current.duration) {
            setDurationStr(formatTime(videoRef.current.duration));
        }
    };

    // Seek Functionality (Clickable Progress Bar)
    const handleSeek = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!progressBarRef.current || !videoRef.current) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoRef.current.duration;
        setProgress(pos * 100);
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    };

    const toggleFullScreen = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        if (videoRef.current?.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
        if (isPlaying) {
            hideControlsTimeout.current = setTimeout(() => {
                setShowControls(false);
            }, 2500);
        }
    };

    return (
        <div className="relative min-h-screen font-sans selection:bg-sky-500/20 selection:text-sky-900 bg-[#fafcff] z-0 pb-24 text-slate-800">
            <PremiumBackground />

            {/* --- HEADER SECTION --- */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-[1250px] mx-auto flex flex-col items-center text-center">

                    {/* Sleek Pill Badge */}
                    <div className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 backdrop-blur-2xl border border-sky-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 ring-1 ring-slate-900/5 transition-all hover:bg-white/80 cursor-default">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow-sm">
                                <MonitorPlay className="w-3 h-3" />
                            </span>
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-700 pr-1">Video Masterclass</span>
                        </div>
                    </div>

                    <h1
                        className="text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black text-slate-900 mb-6 tracking-tight leading-[1] animate-fade-in-up"
                        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                    >
                        Master the Platform <br className="hidden md:block" />
                        <span className="relative inline-block mt-2">
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#0284c7,#3b82f6,#6366f1,#0284c7)] bg-[length:200%_auto] animate-[gradient-text_6s_linear_infinite]">
                                In Minutes.
                            </span>
                        </span>
                    </h1>

                    <p
                        className="text-slate-500 text-lg md:text-[21px] leading-[1.6] max-w-2xl mx-auto font-medium animate-fade-in-up mix-blend-multiply"
                        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                    >
                        Explore our comprehensive video guides to discover how to streamline your workflow and unlock the full potential of our tools.
                    </p>
                </div>
            </section>

            {/* --- MULTI-VIDEO HERO SECTION --- */}
            <section className="px-4 sm:px-6 lg:px-8 relative z-20 mb-24">
                <div className="max-w-[1250px] mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                        {/* --- MAIN VIDEO PLAYER --- */}
                        <div className="lg:col-span-8 relative group flex flex-col">

                            {/* Cinematic Glow Behind Video */}
                            <div className="absolute -inset-1.5 bg-gradient-to-b from-sky-400/40 via-blue-300/30 to-indigo-300/20 blur-2xl rounded-[2.5rem] -z-10" />

                            <div className="relative rounded-[2rem] bg-slate-900 overflow-hidden shadow-[0_32px_80px_-24px_rgba(14,165,233,0.3)] ring-1 ring-black/10">
                                <div
                                    className="relative w-full aspect-video cursor-pointer"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={() => isPlaying && setShowControls(false)}
                                    onClick={togglePlay}
                                >
                                    <video
                                        key={activeVideo.id}
                                        ref={videoRef}
                                        src={activeVideo.url}
                                        poster={activeVideo.poster}
                                        className="w-full h-full object-cover transition-opacity duration-500"
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => setIsPlaying(false)}
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleTimeUpdate}
                                        playsInline
                                    />

                                    {/* Big Center Play Button (Visible on Pause) */}
                                    <div className={`absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isPlaying ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/30 hover:scale-105 transition-all duration-300">
                                            <Play className="w-10 h-10 text-white ml-2 drop-shadow-md" />
                                        </div>
                                    </div>

                                    {/* Sleek Floating Video Controls Bar */}
                                    <div
                                        className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] p-3 px-5 rounded-2xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
                                            <button onClick={togglePlay} className="text-white hover:text-sky-400 transition-colors active:scale-95">
                                                {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
                                            </button>
                                            <button onClick={toggleMute} className="text-white hover:text-sky-400 transition-colors active:scale-95">
                                                {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>

                                        {/* Interactive Progress Bar */}
                                        <div className="flex-1 mx-4 sm:mx-6 flex items-center gap-3">
                                            <span className="text-[11px] font-medium text-white/80 tabular-nums shrink-0">{currentTimeStr}</span>

                                            <div
                                                ref={progressBarRef}
                                                className="flex-1 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group/progress relative"
                                                onClick={handleSeek}
                                            >
                                                <div
                                                    className="absolute top-0 bottom-0 left-0 bg-sky-400 rounded-full transition-all duration-100 ease-linear"
                                                    style={{ width: `${progress}%` }}
                                                />
                                                {/* Hover indication logic can be added here */}
                                            </div>

                                            <span className="text-[11px] font-medium text-white/80 tabular-nums shrink-0">{durationStr}</span>
                                        </div>

                                        <button onClick={toggleFullScreen} className="text-white hover:text-sky-400 transition-colors active:scale-95 shrink-0">
                                            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Currently Playing Info & Metadata */}
                            <div className="mt-8 px-2 max-w-3xl flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-[11px] font-black uppercase tracking-widest ring-1 ring-inset ring-sky-200/50">Now Playing</span>
                                </div>
                                <h2 className="text-[2rem] font-bold text-slate-900 mb-3 leading-tight tracking-tight">{activeVideo.title}</h2>
                                <p className="text-slate-500 text-[17px] font-medium leading-relaxed mb-6">{activeVideo.description}</p>

                                {/* Instructor/Module Meta Tag */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-slate-200/60 ring-1 ring-slate-900/5 shadow-sm mt-auto self-start pr-8">
                                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 border-2 border-white shadow-sm">
                                        <UserCircle className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                            {activeVideo.instructor} <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                                        </div>
                                        <div className="text-[13px] font-semibold text-slate-500">Platform Expert & Educator</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- PLAYLIST / UP NEXT --- */}
                        <div className="lg:col-span-4 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Up Next</h3>
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm font-bold text-slate-500 ring-1 ring-inset ring-slate-900/5">{videos.length} Modules</span>
                            </div>

                            {/* Fading bottom edge using mask-image */}
                            <div
                                className="flex flex-col gap-3 max-h-[550px] lg:max-h-[650px] overflow-y-auto pr-2 pb-12 no-scrollbar"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                                }}
                            >
                                {videos.map((vid) => {
                                    const isActive = activeVideo.id === vid.id;
                                    return (
                                        <button
                                            key={vid.id}
                                            onClick={() => setActiveVideo(vid)}
                                            className={`group relative flex items-start gap-4 p-3.5 rounded-2xl transition-all duration-400 text-left w-full overflow-hidden
                                                ${isActive
                                                    ? 'bg-gradient-to-r from-sky-50/80 to-white shadow-[0_8px_24px_rgba(14,165,233,0.12)] ring-1 ring-sky-200'
                                                    : 'bg-white/60 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/60'
                                                }
                                            `}
                                        >
                                            {/* Active State Background Glow */}
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-transparent opacity-50 pointer-events-none" />
                                            )}

                                            {/* Thumbnail */}
                                            <div className="relative w-[130px] h-[80px] rounded-[14px] overflow-hidden shrink-0 bg-slate-100 ring-1 ring-slate-900/5">
                                                <img
                                                    src={vid.poster}
                                                    alt={vid.title}
                                                    className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                                                />
                                                <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-slate-900/30' : 'bg-slate-900/10 group-hover:bg-slate-900/20'}`} />

                                                {/* Animated Equalizer or Play Icon */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {isActive && isPlaying ? (
                                                        <div className="w-10 h-10 rounded-full bg-sky-500/90 backdrop-blur-md flex items-center justify-center gap-1 shadow-lg shadow-sky-500/30">
                                                            <div className="w-1 bg-white rounded-full eq-bar" />
                                                            <div className="w-1 bg-white rounded-full eq-bar" style={{ animationDelay: '0.2s' }} />
                                                            <div className="w-1 bg-white rounded-full eq-bar" style={{ animationDelay: '0.4s' }} />
                                                        </div>
                                                    ) : isActive && !isPlaying ? (
                                                        <div className="w-10 h-10 rounded-full bg-sky-500/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-sky-500/30">
                                                            <Play className="w-4 h-4 text-white ml-0.5" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                                            <Play className="w-4 h-4 text-white ml-0.5" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                                                    {vid.duration}
                                                </div>
                                            </div>

                                            {/* Video Info in List */}
                                            <div className={`flex flex-col justify-center py-1.5 relative z-10 transition-transform duration-300 ease-out ${isActive ? '' : 'group-hover:translate-x-1'}`}>
                                                <h4 className={`text-[15px] font-bold line-clamp-2 leading-tight mb-2 transition-colors duration-300 ${isActive ? 'text-sky-700' : 'text-slate-800 group-hover:text-sky-600'}`}>
                                                    {vid.title}
                                                </h4>
                                                {isActive ? (
                                                    <span className="text-[12px] font-bold text-sky-500 flex items-center gap-1.5 uppercase tracking-wide">
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                                        </span>
                                                        Playing Now
                                                    </span>
                                                ) : (
                                                    <span className="text-[13px] font-semibold text-slate-400 flex items-center gap-1.5 transition-colors group-hover:text-slate-600">
                                                        Watch Video
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- REFINED BENTO CTA SECTION --- */}
            <section className="px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up mb-20" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="max-w-[1250px] mx-auto">
                    <div className="relative rounded-[3rem] bg-white border border-slate-200/60 shadow-[0_20px_60px_-16px_rgba(14,165,233,0.1)] overflow-hidden flex flex-col md:flex-row items-center justify-between p-10 lg:p-16">

                        {/* Decorative Bento Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none opacity-40" />

                        <div className="relative z-10 md:max-w-xl text-center md:text-left mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">Ready to transform your entire workflow?</h2>
                            <p className="text-slate-500 text-[17px] font-medium leading-relaxed">
                                Join thousands of elite teams who are already saving hours every week. Create your account today and unlock full access.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-sky-600 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_28px_rgba(14,165,233,0.3)] transition-all duration-300 transform active:scale-95">
                                Start Free Trial <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADVANCED CSS KEYFRAMES --- */}
            <style>{`
                /* Hide scrollbars */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                /* Custom Animation for Active Video Equalizer */
                @keyframes equalizer {
                    0% { height: 4px; }
                    50% { height: 16px; }
                    100% { height: 4px; }
                }
                .eq-bar {
                    width: 4px;
                    background-color: white;
                    border-radius: 4px;
                    animation: equalizer 1.2s ease-in-out infinite;
                }

                @keyframes blob-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                /* Hide default video controls specifically for webkit */
                video::-webkit-media-controls { display: none !important; }
            `}</style>
        </div>
    );
}