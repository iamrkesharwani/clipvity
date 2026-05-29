import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { logoutUser } from '../../store/auth/authThunk';
import { LogOut, Play } from 'lucide-react';

const Home = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-[#080b14] font-sans text-[#f0ece4] selection:bg-orange-500/30">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.07)_0%,transparent_70%)] blur-[80px]" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05)_0%,transparent_70%)] blur-[80px]" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#080b14]/80 backdrop-blur-md px-5 sm:px-8 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-[0.2em] text-orange-500 uppercase"
        >
          <Play size={20} className="fill-orange-500 shrink-0" />
          Clipvity
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-[#8891a8]">
                <span className="font-semibold text-[#f0ece4]">
                  {user?.name}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 sm:px-4 py-2 text-sm font-semibold text-[#f0ece4] transition-colors hover:bg-white/10 hover:text-orange-400"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-[13px] font-bold tracking-[0.14em] text-[#080b14] uppercase transition-colors hover:bg-orange-400"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-12">
        {/* Hero / greeting */}
        <div className="mb-10 sm:mb-12">
          {isAuthenticated ? (
            <>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-orange-500">
                Welcome Back
              </p>
              <h1 className="font-display text-[2rem] sm:text-[2.5rem] font-semibold leading-tight">
                Good to see you,{' '}
                <em className="italic text-orange-500">{user?.name}</em>
              </h1>
            </>
          ) : (
            <>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-orange-500">
                Premium Content
              </p>
              <h1 className="font-display text-[2rem] sm:text-[2.5rem] font-semibold leading-tight">
                Discover <em className="italic text-orange-500">premium</em>{' '}
                content.
              </h1>
            </>
          )}
          <p className="mt-2 text-sm sm:text-base text-[#8891a8]">
            Explore the latest uploads from the community.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group relative aspect-video cursor-pointer rounded-lg border border-white/5 bg-[#0f1320] overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent" />
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:scale-110">
                  <Play
                    size={20}
                    className="ml-0.5 fill-white/20 text-white/20 transition-colors duration-300 group-hover:fill-orange-500 group-hover:text-orange-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guest CTA banner */}
        {!isAuthenticated && (
          <div className="mt-12 sm:mt-16 relative overflow-hidden rounded-xl border border-orange-500/20 bg-[#0f1320] px-6 sm:px-10 py-8 sm:py-10">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-[linear-gradient(to_right,transparent,rgba(249,115,22,0.5),transparent)]" />
            <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-[32px]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="mb-1 text-[11px] font-semibold tracking-[0.28em] uppercase text-orange-500">
                  Members Only
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#f0ece4]">
                  Unlock the full experience.
                </h2>
                <p className="mt-1 text-sm text-[#8891a8]">
                  Create a free account to access all content.
                </p>
              </div>
              <Link
                to="/register"
                className="shrink-0 rounded-md bg-orange-500 px-6 py-3 text-[13px] font-bold tracking-[0.14em] text-[#080b14] uppercase transition-colors hover:bg-orange-400"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
