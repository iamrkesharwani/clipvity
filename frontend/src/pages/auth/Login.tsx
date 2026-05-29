import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@clipvity/shared/schema/auth';
import { loginUser } from '../../store/auth/authThunk';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) navigate('/');
  };

  const inputClass =
    'w-full bg-[#161b2e] border border-white/[0.07] rounded-md px-4 py-3 text-[15px] text-[#f0ece4] caret-orange-500 outline-none transition-[border,box-shadow] duration-150 placeholder:text-[#3d4563] focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/15';

  const labelClass =
    'block mb-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8891a8]';

  return (
    <div className="flex w-screen h-dvh overflow-hidden bg-[#080b14] font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-14 overflow-hidden bg-[#0f1320]">
        <div className="pointer-events-none absolute top-[15%] left-[-8%] w-115 h-115 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,transparent_68%)] blur-[48px]" />
        <div className="pointer-events-none absolute bottom-[8%] right-[-6%] w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_70%)] blur-[56px]" />
        <div className="pointer-events-none absolute top-0 right-0 w-px h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.4)_35%,rgba(249,115,22,0.4)_65%,transparent_100%)]" />

        <Link
          to={'/'}
          className="flex group text-base font-bold tracking-[0.28em] uppercase text-orange-500 gap-1.5"
        >
          <ChevronLeft className="transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          Clipvity
        </Link>

        <div className="relative z-10">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.32em] uppercase text-orange-500">
            Welcome Back
          </p>
          <h1 className="mb-5 font-display font-semibold leading-[1.08] text-[clamp(2.6rem,3.2vw,3.8rem)] text-[#f0ece4]">
            Your desires
            <br />
            <em className="italic text-orange-500">await</em> your
            <br />
            return.
          </h1>
          <p className="max-w-[18rem] text-[15px] leading-[1.65] text-[#8891a8]">
            Pick up right where you left off. Everything you love is still here,
            just for you.
          </p>
        </div>

        <p className="text-xs text-[#3d4563]">18+ only · Members access only</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden px-8 py-14 bg-[#080b14]">
        <div className="mb-10 lg:hidden">
          <Link
            to={'/'}
            className="flex group text-base font-bold tracking-[0.28em] uppercase text-orange-500 gap-1.5"
          >
            <ChevronLeft className="transition-transform duration-300 ease-out group-hover:-translate-x-1" />
            Clipvity
          </Link>
        </div>

        <div className="w-full max-w-90 mx-auto">
          <h2 className="mb-1 font-display font-semibold text-[2rem] text-[#f0ece4]">
            Sign in
          </h2>

          <p className="mb-8 text-sm text-[#8891a8]">
            Not a member yet?{' '}
            <Link
              to={'/register'}
              className="text-orange-500 font-medium no-underline hover:text-orange-400 transition-colors duration-150"
            >
              Create an account
            </Link>
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-md bg-red-400/8 border border-red-400/30 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="jane@example.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass} style={{ marginBottom: 0 }}>
                  Password
                </label>
                <Link
                  to={'/forgot'}
                  className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#3d4563] hover:text-[#8891a8] transition-colors duration-150"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d4563] hover:text-[#8891a8] transition-colors duration-150"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full py-3.5 rounded-md bg-orange-500 text-[#080b14] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-150 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
