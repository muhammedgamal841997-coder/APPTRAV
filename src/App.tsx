import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart, Share2, 
  Download, MoreVertical, Search, Bell, Menu, Home, Compass, Library, 
  User, Plus, Volume2, VolumeX, Maximize2, Minimize2, Check, X, Sparkles, 
  Music, Film, ArrowLeft, Sliders, ChevronRight, Moon, Sun, Settings, HelpCircle, Info, Clock, ThumbsUp, ThumbsDown
} from 'lucide-react';

// Sample Media Data matching the design preview
const INITIAL_SONGS = [
  {
    id: 1,
    title: 'Better Together',
    artist: 'Dreamer',
    album: 'Neon Dreams',
    duration: 236, // 03:56
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80',
    type: 'audio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    likes: '120K'
  },
  {
    id: 2,
    title: 'Ocean Dreams',
    artist: 'Nature Vibes',
    album: 'Serenity',
    duration: 260, // 04:20
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: '85K'
  },
  {
    id: 3,
    title: 'Beautiful Journey',
    artist: 'Nature Vibes',
    album: 'Wanderlust',
    duration: 236,
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: '142K'
  },
  {
    id: 4,
    title: 'Midnight Chill Beats',
    artist: 'Lofi Girl',
    album: 'Study Session',
    duration: 198,
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&q=80',
    type: 'audio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    likes: '99K'
  }
];

const PLAYLISTS = [
  { id: 1, name: 'Chill Vibes', songsCount: 124, cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80' },
  { id: 2, name: 'Workout Mix', songsCount: 85, cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&q=80' },
  { id: 3, name: 'Arab Hits', songsCount: 112, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80' },
  { id: 4, name: 'Relaxing Music', songsCount: 97, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80' }
];

export default function App() {
  // Screens: 'onboarding', 'home', 'explore', 'library', 'profile', 'player', 'video_player'
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showPlayer, setShowPlayer] = useState(false);
  
  // Player state
  const [currentTrack, setCurrentTrack] = useState(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.duration);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  
  // Media Reference
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  // Sync Duration and play status
  useEffect(() => {
    setCurrentTime(0);
    setDuration(currentTrack.duration);
  }, [currentTrack]);

  const togglePlay = () => {
    if (currentTrack.type === 'video' && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    } else if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (currentTrack.type === 'video' && videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    } else if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (currentTrack.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = newTime;
    } else if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const playSong = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  // Onboarding Screen View
  if (onboardingStep <= 2) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans p-2">
        <div className="w-full max-w-[390px] h-[844px] bg-[#0c0519] text-white rounded-[40px] shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col justify-between p-6 relative">
          
          {/* Neon Glow Effects */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

          {onboardingStep === 1 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center z-10">
              <div className="w-24 h-24 mb-8 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/40">
                <Music className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Music & Video
              </h1>
              <p className="text-purple-300/70 text-sm mt-2 tracking-widest uppercase">
                Play • Discover • Enjoy
              </p>

              {/* Decorative Audio Wave Art */}
              <div className="mt-16 relative flex items-center justify-center w-full h-40">
                <div className="absolute w-48 h-48 border border-purple-500/20 rounded-full animate-ping"></div>
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 70, 30, 90, 60, 100, 50, 80, 40, 90, 30, 60].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-gradient-to-t from-purple-600 to-pink-400 rounded-full animate-pulse" 
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center z-10">
              {/* Headphones Image Mock */}
              <div className="relative mb-8">
                <div className="w-56 h-56 rounded-full bg-gradient-to-b from-purple-600/30 to-transparent flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" 
                    alt="Headphones" 
                    className="w-48 h-48 object-cover rounded-full shadow-2xl border-2 border-purple-500/30"
                  />
                  <Sparkles className="absolute top-2 right-4 text-purple-400 animate-bounce" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Your Music & Video World</h2>
              <p className="text-slate-400 text-sm mt-3 px-6 leading-relaxed">
                Listen to your favorite songs and watch amazing videos in ultra high fidelity.
              </p>
            </div>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mb-6 z-10">
            <div className={`h-2 rounded-full transition-all duration-300 ${onboardingStep === 1 ? 'w-6 bg-purple-500' : 'w-2 bg-purple-900'}`}></div>
            <div className={`h-2 rounded-full transition-all duration-300 ${onboardingStep === 2 ? 'w-6 bg-purple-500' : 'w-2 bg-purple-900'}`}></div>
          </div>

          {/* Action Button */}
          <div className="space-y-3 z-10">
            <button 
              onClick={() => setOnboardingStep(prev => prev + 1)}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-purple-600/30 transition duration-200 active:scale-98"
            >
              Get Started
            </button>
            {onboardingStep === 2 && (
              <button 
                onClick={() => setOnboardingStep(3)}
                className="w-full py-3 bg-transparent border border-purple-500/30 text-purple-200 font-medium rounded-full hover:bg-purple-900/20 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans p-0 sm:p-4">
      {/* Phone Screen Container */}
      <div className="w-full max-w-[390px] h-[844px] bg-[#0b0318] text-white rounded-[40px] shadow-2xl border-4 border-slate-900 overflow-hidden flex flex-col relative">

        {/* Top Status Bar (Android/iOS Style) */}
        <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs font-semibold text-slate-300 z-50">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500/50"></div>
            <div className="w-3 h-2 bg-slate-300 rounded-sm"></div>
          </div>
        </div>

        {/* MAIN BODY APP CONTENT BASED ON TAB */}
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-none relative">

          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-20 left-0 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* HOME SCREEN */}
          {activeTab === 'home' && (
            <div className="p-5 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Good Morning!</h1>
                  <p className="text-xs text-purple-300/70">Let's enjoy something great today 🎵</p>
                </div>
                <div className="flex gap-3 text-slate-300">
                  <Search className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" onClick={() => setActiveTab('explore')} />
                  <Bell className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
                </div>
              </div>

              {/* Main Banner */}
              <div className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-r from-purple-900 to-indigo-900 p-5 flex flex-col justify-between shadow-xl border border-purple-500/20 group">
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" 
                  alt="Concert" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/40 to-transparent"></div>
                <div className="relative z-10">
                  <span className="text-[10px] bg-purple-600/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Featured</span>
                  <h2 className="text-lg font-extrabold mt-2 leading-tight">Music Brings<br />Us Together</h2>
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <button 
                    onClick={() => playSong(INITIAL_SONGS[0])}
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-semibold shadow-md transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play Now
                  </button>
                </div>
              </div>

              {/* Quick Access Grid */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold tracking-wide text-slate-200">Quick Access</h3>
                  <span className="text-xs text-purple-400 cursor-pointer">See All &gt;</span>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {[
                    { label: 'Music', icon: Music, color: 'from-purple-600 to-indigo-600' },
                    { label: 'Videos', icon: Film, color: 'from-blue-600 to-purple-600' },
                    { label: 'Favorites', icon: Heart, color: 'from-pink-600 to-rose-600' },
                    { label: 'Downloads', icon: Download, color: 'from-indigo-600 to-cyan-600' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[11px] text-slate-400 group-hover:text-purple-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Now */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold tracking-wide text-slate-200">Trending Now</h3>
                  <span className="text-xs text-purple-400 cursor-pointer">See All &gt;</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {INITIAL_SONGS.map((song) => (
                    <div 
                      key={song.id} 
                      onClick={() => playSong(song)}
                      className="bg-purple-950/30 border border-purple-500/10 rounded-xl p-2 cursor-pointer hover:bg-purple-900/30 transition group relative overflow-hidden"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                        <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-current text-white ml-0.5" />
                          </div>
                        </div>
                        {song.type === 'video' && (
                          <span className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-purple-300 font-mono">
                            VIDEO
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-semibold truncate text-slate-200">{song.title}</h4>
                      <p className="text-[10px] text-purple-300/60 truncate">{song.artist}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPLORE / SEARCH SCREEN */}
          {activeTab === 'explore' && (
            <div className="p-5 space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input 
                  type="text"
                  placeholder="Search for songs, artists..."
                  className="w-full bg-purple-950/40 border border-purple-500/20 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Tags Filter */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['Songs', 'Videos', 'Artists', 'Albums', 'Playlists'].map((tag, idx) => (
                  <button 
                    key={idx}
                    className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition ${idx === 0 ? 'bg-purple-600 text-white' : 'bg-purple-950/40 text-purple-300/70 hover:bg-purple-900/50'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-semibold text-slate-400">Recent Searches</h3>
                  <span className="text-[10px] text-purple-400 cursor-pointer">Clear All</span>
                </div>
                <div className="space-y-2">
                  {['Coldplay', 'Ed Sheeran', 'Relaxing Music'].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-purple-900/20 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>{item}</span>
                      </div>
                      <X className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-white" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 mb-2">Popular Searches</h3>
                <div className="space-y-2">
                  {['Arabic Songs', 'Top 50', 'Trending Music'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1.5 text-xs text-slate-300 cursor-pointer hover:text-purple-400">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LIBRARY SCREEN */}
          {activeTab === 'library' && (
            <div className="p-5 space-y-5">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Playlists</h1>
                <Search className="w-5 h-5 text-slate-300" />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-purple-600 rounded-full text-xs font-medium">All</button>
                <button className="px-4 py-1.5 bg-purple-950/40 text-purple-300/70 rounded-full text-xs font-medium">Favorites</button>
                <button className="px-4 py-1.5 bg-purple-950/40 text-purple-300/70 rounded-full text-xs font-medium">Created by Me</button>
              </div>

              {/* Playlists Grid */}
              <div className="grid grid-cols-2 gap-4">
                {PLAYLISTS.map((pl) => (
                  <div key={pl.id} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 border border-purple-500/10 shadow-lg">
                      <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <span className="text-[10px] text-purple-200">{pl.songsCount} Songs</span>
                        <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center shadow">
                          <Play className="w-3.5 h-3.5 fill-current text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-slate-200">{pl.name}</h3>
                  </div>
                ))}
              </div>

              {/* Add Playlist Button */}
              <button className="w-full py-3 bg-purple-900/30 border border-dashed border-purple-500/40 rounded-2xl flex items-center justify-center gap-2 text-xs text-purple-300 font-semibold hover:bg-purple-900/50 transition">
                <Plus className="w-4 h-4" /> Create Playlist
              </button>
            </div>
          )}

          {/* PROFILE SCREEN */}
          {activeTab === 'profile' && (
            <div className="p-5 space-y-6">
              {/* User Info Header */}
              <div className="flex items-center gap-4 border-b border-purple-900/30 pb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" alt="User" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Music Lover</h2>
                  <p className="text-xs text-purple-300/60">musiclover@gmail.com</p>
                </div>
              </div>

              {/* VIP Card */}
              <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-2xl p-4 flex justify-between items-center shadow-xl border border-purple-400/30">
                <div>
                  <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Premium Plan
                  </div>
                  <p className="text-[11px] text-purple-200 mt-1">Unlimited Access & High Quality Audio</p>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-300" />
              </div>

              {/* Profile Menu Items */}
              <div className="space-y-1">
                {[
                  { label: 'Downloads', icon: Download },
                  { label: 'History', icon: Clock },
                  { label: 'Favorites', icon: Heart },
                  { label: 'Playlists', icon: Library },
                  { label: 'Settings', icon: Settings },
                  { label: 'Help & Support', icon: HelpCircle },
                  { label: 'About App', icon: Info }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 px-2 rounded-xl hover:bg-purple-950/40 cursor-pointer transition text-xs text-slate-200">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-purple-400" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* MINI PLAYER (Floating at Bottom above nav bar) */}
        {showPlayer && currentTrack && activeTab !== 'player_full' && (
          <div 
            onClick={() => setActiveTab('player_full')}
            className="absolute bottom-16 left-3 right-3 bg-purple-950/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-2.5 flex items-center justify-between shadow-2xl cursor-pointer z-40"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="truncate">
                <h4 className="text-xs font-semibold truncate text-white">{currentTrack.title}</h4>
                <p className="text-[10px] text-purple-300/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-1.5 rounded-full transition ${isFavorite ? 'text-pink-500' : 'text-slate-400'}`}
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
              <button 
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
            </div>
          </div>
        )}

        {/* FULL SCREEN PLAYER MODAL */}
        {activeTab === 'player_full' && currentTrack && (
          <div className="absolute inset-0 bg-[#0c0519] z-50 flex flex-col justify-between p-6 animate-in slide-in-from-bottom duration-300">
            {/* Background Ambient Blur */}
            <div className="absolute inset-0 bg-purple-900/10 backdrop-blur-3xl pointer-events-none"></div>

            {/* Top Bar */}
            <div className="flex justify-between items-center z-10">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-purple-950/50 text-slate-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">Now Playing</span>
              <button className="p-2 rounded-full bg-purple-950/50 text-slate-300">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual Display (Video or Vinyl Disk) */}
            <div className="my-auto py-4 flex flex-col items-center z-10">
              {currentTrack.type === 'video' ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 relative">
                  <video 
                    ref={videoRef}
                    src={currentTrack.url}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                  />
                </div>
              ) : (
                /* Glowing Rotating Vinyl Record Effect */
                <div className="relative flex items-center justify-center my-6">
                  <div className={`w-64 h-64 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-900 p-2 shadow-2xl shadow-purple-600/40 relative flex items-center justify-center ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
                    {/* Vinyl grooves */}
                    <div className="w-full h-full rounded-full border-4 border-black/40 flex items-center justify-center bg-[#111]">
                      <div className="w-48 h-48 rounded-full border border-slate-800 flex items-center justify-center">
                        <img 
                          src={currentTrack.cover} 
                          alt="Album Art" 
                          className="w-28 h-28 rounded-full object-cover border-4 border-slate-900 shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Sound Wave Neon Ring */}
                  <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-pulse pointer-events-none"></div>
                </div>
              )}

              {/* Title & Artist */}
              <div className="text-center mt-6 w-full px-4">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h2 className="text-lg font-extrabold text-white truncate max-w-[220px]">{currentTrack.title}</h2>
                    <p className="text-xs text-purple-300/70 truncate mt-0.5">{currentTrack.artist}</p>
                  </div>
                  <button onClick={() => setIsFavorite(!isFavorite)} className="p-2">
                    <Heart className={`w-5 h-5 ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-slate-400'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Hidden Audio Element */}
            {currentTrack.type === 'audio' && (
              <audio 
                ref={audioRef} 
                src={currentTrack.url}
                onTimeUpdate={handleTimeUpdate}
              />
            )}

            {/* Controls Section */}
            <div className="space-y-4 z-10">
              {/* Seek Bar */}
              <div>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-purple-300/70 mt-1 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Action Buttons (Shuffle, Prev, Play/Pause, Next, Repeat) */}
              <div className="flex justify-between items-center px-4">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2 rounded-full transition ${isShuffle ? 'text-purple-400' : 'text-slate-500'}`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                
                <button className="p-2 text-slate-200 hover:text-white transition">
                  <SkipBack className="w-6 h-6 fill-current" />
                </button>

                <button 
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 hover:scale-105 transition"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>

                <button className="p-2 text-slate-200 hover:text-white transition">
                  <SkipForward className="w-6 h-6 fill-current" />
                </button>

                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-2 rounded-full transition ${isRepeat ? 'text-purple-400' : 'text-slate-500'}`}
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Extra Bar (Likes / Share / Download) */}
              <div className="flex justify-around items-center pt-2 text-slate-400 border-t border-purple-900/20 text-xs">
                <button className="flex items-center gap-1 hover:text-purple-300">
                  <ThumbsUp className="w-4 h-4" /> <span>{currentTrack.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-300">
                  <Share2 className="w-4 h-4" /> <span>Share</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-300">
                  <Download className="w-4 h-4" /> <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        {activeTab !== 'player_full' && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0c0519]/95 backdrop-blur-lg border-t border-purple-900/30 flex justify-around items-center z-30 px-2">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'explore', label: 'Explore', icon: Compass },
              { id: 'library', label: 'Library', icon: Library },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-purple-400"></div>}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}