import type { User } from '../types'
import { User as UserIcon, Shield, Star, Heart, LogOut, Camera } from 'lucide-react'

interface UserProfileProps {
  user: User
  onLogout: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className='max-w-7xl mx-auto px-6 pb-20 pt-10'>
      {/* Breadcrumb */}
      <div className='text-xs text-slate-500 mb-8 flex items-center gap-2'>
        <span>Home</span>
        <span>/</span>
        <span>Account</span>
        <span>/</span>
        <span className='text-primary'>Profile Settings</span>
      </div>

      <div className='grid lg:grid-cols-4 gap-8'>
        {/* Sidebar */}
        <div className='lg:col-span-1'>
          <div className='bg-dark-800 rounded-xl border border-dark-700 p-6 text-center mb-6'>
            <div className='w-24 h-24 mx-auto bg-dark-700 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-dark-900 mb-4 relative'>
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <h2 className='text-xl font-bold text-white'>
              {user.firstName} {user.lastName}
            </h2>
            <p className='text-slate-500 text-xs mt-1'>Member since {user.joinDate}</p>
          </div>

          <div className='bg-dark-800 rounded-xl border border-dark-700 overflow-hidden'>
            <button className='w-full flex items-center gap-4 px-6 py-4 bg-primary/10 text-primary border-l-4 border-primary'>
              <UserIcon className='w-5 h-5' />
              <span className='text-sm font-medium'>Personal Info</span>
            </button>
            <button className='w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              <Shield className='w-5 h-5' />
              <span className='text-sm font-medium'>Password Security</span>
            </button>
            <button className='w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              <Star className='w-5 h-5' />
              <span className='text-sm font-medium'>My Reviews</span>
            </button>
            <button className='w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              <Heart className='w-5 h-5' />
              <span className='text-sm font-medium'>Wishlist</span>
            </button>
            <div className='h-px bg-dark-700 my-2'></div>
            <button
              onClick={onLogout}
              className='w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 transition-colors'
            >
              <LogOut className='w-5 h-5' />
              <span className='text-sm font-medium'>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='lg:col-span-3 space-y-8'>
          {/* Personal Information */}
          <div className='bg-dark-800 rounded-xl border border-dark-700 p-8'>
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h3 className='text-lg font-bold text-white mb-1'>Personal Information</h3>
                <p className='text-slate-500 text-sm'>Manage your personal details and public profile.</p>
              </div>
              <button className='text-primary text-xs font-medium hover:underline flex items-center gap-1'>
                Edit Photo <Camera className='w-3 h-3' />
              </button>
            </div>

            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  defaultValue={user.firstName}
                  className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors'
                />
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Last Name</label>
                <input
                  type='text'
                  defaultValue={user.lastName}
                  className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors'
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <span className='absolute left-4 top-3.5 text-slate-500'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
                      <path d='M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z' />
                      <path d='M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z' />
                    </svg>
                  </span>
                  <input
                    type='email'
                    defaultValue={user.email}
                    className='w-full bg-dark-900 border border-dark-600 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors'
                  />
                </div>
                <p className='text-[10px] text-slate-500 mt-2'>Contact support to change your email address.</p>
              </div>

              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>
                  Year of Birth
                </label>
                <select className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors'>
                  <option>1993</option>
                  <option>1994</option>
                  <option>1995</option>
                </select>
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>Gender</label>
                <div className='flex gap-4 py-3'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='gender'
                      defaultChecked={user.gender === 'Female'}
                      className='text-primary focus:ring-primary bg-dark-900 border-slate-600'
                    />
                    <span className='text-sm text-slate-300'>Female</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='gender'
                      defaultChecked={user.gender === 'Male'}
                      className='text-primary focus:ring-primary bg-dark-900 border-slate-600'
                    />
                    <span className='text-sm text-slate-300'>Male</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='gender'
                      defaultChecked={user.gender === 'Other'}
                      className='text-primary focus:ring-primary bg-dark-900 border-slate-600'
                    />
                    <span className='text-sm text-slate-300'>Other</span>
                  </label>
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <button className='bg-primary hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20'>
                Update Profile
              </button>
            </div>
          </div>

          {/* Password & Security */}
          <div className='bg-dark-800 rounded-xl border border-dark-700 p-8 opacity-60 hover:opacity-100 transition-opacity'>
            <div className='mb-6'>
              <h3 className='text-lg font-bold text-white mb-1'>Password & Security</h3>
              <p className='text-slate-500 text-sm'>Ensure your account is secure with a strong password.</p>
            </div>

            <div className='space-y-4 mb-6'>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>
                  Current Password
                </label>
                <input
                  type='password'
                  value='********'
                  readOnly
                  className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-slate-400 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2'>
                  New Password
                </label>
                <input
                  type='password'
                  placeholder='New password'
                  className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors'
                />
                <div className='flex gap-1 mt-2 h-1 w-full max-w-[200px]'>
                  <div className='flex-1 bg-green-500 rounded-full'></div>
                  <div className='flex-1 bg-green-500 rounded-full'></div>
                  <div className='flex-1 bg-dark-600 rounded-full'></div>
                </div>
                <span className='text-[10px] text-green-500 mt-1 block'>Password strength: Strong</span>
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <button className='text-slate-400 hover:text-white px-4 py-2.5 text-sm font-medium'>Cancel</button>
              <button className='bg-primary hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20'>
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
