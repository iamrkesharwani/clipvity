import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterInput,
} from '@clipvity/shared/schema/auth';
import { registerUser } from '../../store/auth/authThunk';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

const cls = {
  input:
    'w-full bg-[#161b2e] border border-white/[0.07] rounded-md px-4 py-3 text-[15px] text-[#f0ece4] caret-orange-500 outline-none transition-[border,box-shadow] duration-150 placeholder:text-[#3d4563] focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/15',
  label:
    'block mb-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8891a8]',
};

interface PasswordFieldProps {
  name: 'password' | 'confirmPassword';
  label: string;
  show: boolean;
  toggle: () => void;
  error?: string;
  register: UseFormRegister<RegisterInput>;
}

const PasswordField = ({
  name,
  label,
  show,
  toggle,
  error: fieldError,
  register,
}: PasswordFieldProps) => (
  <div>
    <label className={cls.label}>{label}</label>
    <div className="relative">
      <input
        {...register(name)}
        type={show ? 'text' : 'password'}
        placeholder="••••••••"
        className={`${cls.input} pr-11`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d4563] hover:text-[#8891a8] transition-colors duration-150"
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
    {fieldError && <p className="mt-1.5 text-xs text-red-400">{fieldError}</p>}
  </div>
);

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const { confirmPassword: _c, ...apiData } = data;
    const resultAction = await dispatch(registerUser(apiData));
    if (registerUser.fulfilled.match(resultAction)) navigate('/');
  };

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
            Members Only
          </p>
          <h1 className="mb-5 font-display font-semibold leading-[1.08] text-[clamp(2.6rem,3.2vw,3.8rem)] text-[#f0ece4]">
            Where desire
            <br />
            <em className="italic text-orange-500">finds</em> its
            <br />
            audience.
          </h1>
          <p className="max-w-[18rem] text-[15px] leading-[1.65] text-[#8891a8]">
            Exclusive content. Uncompromising quality. A space built for adults
            who know what they want.
          </p>
        </div>

        <p className="text-xs text-[#3d4563]">
          18+ only · You must agree to our Terms upon registration
        </p>
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
            Create your account
          </h2>

          <p className="mb-8 text-sm text-[#8891a8]">
            Already a member?{' '}
            <Link
              to={'/login'}
              className="text-orange-500 font-medium no-underline hover:text-orange-400 transition-colors duration-150"
            >
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-md bg-red-400/8 border border-red-400/30 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div>
              <label className={cls.label}>Full Name</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Jane Doe"
                className={cls.input}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className={cls.label}>Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="jane@example.com"
                className={cls.input}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <PasswordField
              name="password"
              label="Password"
              show={showPassword}
              toggle={() => setShowPassword((p) => !p)}
              error={errors.password?.message}
              register={register}
            />

            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword((p) => !p)}
              error={errors.confirmPassword?.message}
              register={register}
            />

            <p className="text-xs leading-relaxed text-[#3d4563]">
              By registering you confirm you are 18 years of age or older and
              agree to our{' '}
              <Link to={'/terms'} className="text-[#8891a8] underline">
                Terms of Service
              </Link>
              .
            </p>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full py-3.5 rounded-md bg-orange-500 text-[#080b14] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-150 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Creating account…' : 'Join Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
