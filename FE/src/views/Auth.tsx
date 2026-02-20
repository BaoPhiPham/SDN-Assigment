import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

interface AuthProps {
  onLogin: () => void
  onBackToHome?: () => void
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBackToHome }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen bg-[#FDFBF7] text-slate-800 flex items-center justify-center p-4 lg:p-0 relative'>
      {/* Back to Home Button */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className='absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 transition-all shadow-sm hover:shadow-md'
        >
          <ArrowLeft className='w-4 h-4' />
          <span className='text-sm font-medium'>Back to Home</span>
        </button>
      )}

      <div className='bg-white w-full max-w-[1200px] h-full lg:h-[800px] rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2'>
        {/* Visual Side */}
        <div className='hidden lg:block relative h-full'>
          <div className='absolute inset-0 bg-black/40 z-10'></div>
          <img
            src='https://images.unsplash.com/photo-1595535373192-fc04375bc64f?q=80&w=1974&auto=format&fit=crop'
            alt='Luxury Perfume'
            className='w-full h-full object-cover'
          />
          <div className='absolute bottom-20 left-12 right-12 z-20 text-white'>
            <div className='w-12 h-0.5 bg-yellow-400 mb-6'></div>
            <h2 className='text-4xl font-serif font-bold mb-4 leading-tight'>
              "The perfume of the soul is remembrance."
            </h2>
            <p className='text-sm font-light opacity-80'>— George Sand</p>
          </div>
        </div>

        {/* Form Side */}
        <div className='p-8 lg:p-20 flex flex-col justify-center bg-[#fcfaf5]'>
          <div className='mb-10 text-center lg:text-left'>
            <div className='flex items-center justify-center lg:justify-start gap-2 mb-6'>
              <span className='text-yellow-600 text-xl'>✦</span>
              <span className='font-serif font-bold tracking-widest text-lg uppercase'>Essence</span>
            </div>
            <h1 className='text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-2'>
              {isRegister ? 'Join the Club' : 'Welcome Back'}
            </h1>
            <p className='text-slate-500 text-sm'>
              {isRegister
                ? 'Create your account to unlock exclusive collections.'
                : 'Please sign in to access your curated collection.'}
            </p>
          </div>

          <form
            className='space-y-5'
            onSubmit={(e) => {
              e.preventDefault()
              onLogin()
            }}
          >
            {isRegister && (
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>First Name</label>
                  <input
                    type='text'
                    className='w-full bg-white border border-slate-200 rounded p-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors'
                    placeholder='e.g. Eleanor'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Last Name</label>
                  <input
                    type='text'
                    className='w-full bg-white border border-slate-200 rounded p-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors'
                    placeholder='e.g. Rigby'
                  />
                </div>
              </div>
            )}

            <div className='space-y-2'>
              <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Email Address</label>
              <input
                type='email'
                className='w-full bg-white border border-slate-200 rounded p-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors'
                placeholder='name@example.com'
              />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Password</label>
                {!isRegister && (
                  <a href='#' className='text-[10px] text-yellow-600 font-bold hover:underline'>
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='w-full bg-white border border-slate-200 rounded p-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-3 text-slate-400 hover:text-slate-600'
                >
                  {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='remember'
                  className='rounded border-slate-300 text-yellow-500 focus:ring-yellow-500'
                />
                <label htmlFor='remember' className='text-xs text-slate-500 cursor-pointer'>
                  Remember me
                </label>
              </div>
            )}

            {isRegister && (
              <div className='bg-yellow-500/10 p-3 rounded border border-yellow-500/20 flex gap-2 items-start'>
                <div className='w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5'>
                  i
                </div>
                <p className='text-[10px] text-yellow-800'>
                  Your account role will default to <span className='font-bold'>Member</span>. Upgrade options available
                  after registration.
                </p>
              </div>
            )}

            <button className='w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3.5 rounded text-sm uppercase tracking-wide shadow-lg shadow-yellow-500/30 transition-all active:scale-[0.99] mt-4'>
              {isRegister ? 'Register' : 'Log In'}
            </button>
          </form>

          <div className='mt-8 text-center border-t border-slate-200 pt-8 relative'>
            <span className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfaf5] px-2 text-[10px] text-slate-400'>
              OR CONTINUE WITH
            </span>
            <div className='flex gap-4 justify-center mb-6'>
              <button className='flex items-center gap-2 px-6 py-2 border border-slate-300 rounded hover:bg-white transition-colors text-xs font-bold text-slate-600'>
                <span className='text-lg'>G</span> Google
              </button>
              <button className='flex items-center gap-2 px-6 py-2 border border-slate-300 rounded hover:bg-white transition-colors text-xs font-bold text-slate-600'>
                <span className='text-lg'></span> Apple
              </button>
            </div>
            <p className='text-xs text-slate-500'>
              {isRegister ? 'Already have an account?' : 'New to our world?'}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className='text-yellow-600 font-bold ml-1 hover:underline'
              >
                {isRegister ? 'Login here' : 'Create an account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
