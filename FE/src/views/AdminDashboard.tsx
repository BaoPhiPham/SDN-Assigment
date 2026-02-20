import { useState } from 'react'
import { ViewState } from '../types'
import { MOCK_BRANDS } from '../constants'
import { Box, Users, BarChart2, Store, Plus, Edit2, Trash2, X, CheckCircle, AlertTriangle } from 'lucide-react'

interface AdminDashboardProps {
  onNavigate: (view: ViewState) => void
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Stats
  const stats = [
    { label: 'Total Brands', value: '24', icon: Store, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Products', value: '145', icon: Box, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Active Members', value: '1,284', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' }
  ]

  return (
    <div className='flex h-screen bg-dark-900 text-slate-300 overflow-hidden font-sans'>
      {/* Sidebar */}
      <aside className='w-64 bg-dark-800 border-r border-dark-700 flex flex-col'>
        <div className='h-20 flex items-center px-6 border-b border-dark-700'>
          <div className='w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-lg mr-3'>
            P
          </div>
          <span className='text-lg font-bold text-white'>PerfumeHub</span>
          <span className='text-[10px] ml-2 text-slate-500 bg-dark-900 px-1 py-0.5 rounded border border-dark-600'>
            Admin
          </span>
        </div>

        <div className='p-4 space-y-1 overflow-y-auto flex-1'>
          <div className='text-xs font-bold text-slate-500 uppercase px-3 py-2 mt-2'>Management</div>
          <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium'>
            <Box className='w-4 h-4' /> Brand Management
          </button>
          <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors'>
            <Box className='w-4 h-4' /> Perfume Inventory
          </button>
          <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors'>
            <Users className='w-4 h-4' /> Member List
          </button>

          <div className='text-xs font-bold text-slate-500 uppercase px-3 py-2 mt-6'>Analytics</div>
          <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors'>
            <BarChart2 className='w-4 h-4' /> Sales Overview
          </button>
          <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors'>
            <CheckCircle className='w-4 h-4' /> Reports
          </button>
        </div>

        <div className='p-4 border-t border-dark-700'>
          <div className='flex items-center gap-2 mb-4 px-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            <span className='text-xs text-slate-400'>System Status: Online</span>
          </div>
          <button
            onClick={() => onNavigate(ViewState.STOREFRONT)}
            className='text-xs text-slate-500 hover:text-white w-full text-center'
          >
            Back to Storefront
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <header className='h-16 border-b border-dark-700 bg-dark-800 flex items-center justify-between px-8'>
          <div className='flex items-center gap-6'>
            <a href='#' className='text-sm font-medium text-slate-400 hover:text-white'>
              Storefront
            </a>
            <a href='#' className='text-sm font-medium text-primary border-b border-primary pb-0.5'>
              Dashboard
            </a>
            <a href='#' className='text-sm font-medium text-slate-400 hover:text-white'>
              Settings
            </a>
          </div>
          <div className='flex items-center gap-3'>
            <div className='text-right hidden sm:block'>
              <div className='text-sm font-bold text-white'>Isabella V.</div>
              <div className='text-xs text-slate-500'>Super Admin</div>
            </div>
            <div className='w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white'>
              IV
            </div>
          </div>
        </header>

        <div className='flex-1 overflow-y-auto p-8'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className='bg-dark-800 border border-dark-700 p-6 rounded-xl flex items-center justify-between'
              >
                <div>
                  <p className='text-xs font-bold text-slate-500 uppercase mb-1'>{stat.label}</p>
                  <h3 className='text-3xl font-bold text-white'>{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className='w-6 h-6' />
                </div>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className='bg-dark-800 border border-dark-700 rounded-xl overflow-hidden'>
            <div className='p-6 border-b border-dark-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div>
                <h2 className='text-lg font-bold text-white'>Brand Management</h2>
                <p className='text-sm text-slate-500'>Manage partner brands and their details</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className='bg-primary hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors'
              >
                <Plus className='w-4 h-4' /> Add New Brand
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-sm text-slate-400'>
                <thead className='bg-dark-900/50 text-xs uppercase font-bold text-slate-500'>
                  <tr>
                    <th className='px-6 py-4'>Brand Name</th>
                    <th className='px-6 py-4'>Status</th>
                    <th className='px-6 py-4'>Products</th>
                    <th className='px-6 py-4'>Last Updated</th>
                    <th className='px-6 py-4 text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-dark-700'>
                  {MOCK_BRANDS.map((brand) => (
                    <tr key={brand.id} className='hover:bg-dark-700/30 transition-colors'>
                      <td className='px-6 py-4 font-medium text-white'>{brand.name}</td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                            brand.status === 'Active'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : brand.status === 'Review'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                          }`}
                        >
                          {brand.status}
                        </span>
                      </td>
                      <td className='px-6 py-4'>{brand.productsCount} SKUs</td>
                      <td className='px-6 py-4'>{brand.lastUpdated}</td>
                      <td className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <button className='p-1.5 hover:bg-dark-600 rounded text-slate-400 hover:text-white transition-colors'>
                            <Edit2 className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className='p-1.5 hover:bg-dark-600 rounded text-slate-400 hover:text-red-500 transition-colors'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='p-4 border-t border-dark-700 flex justify-between items-center text-xs text-slate-500'>
              <span>Showing 4 of 24 brands</span>
              <div className='flex gap-1'>
                <button className='px-2 py-1 hover:bg-dark-700 rounded'>&lt;</button>
                <button className='px-2 py-1 hover:bg-dark-700 rounded'>&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {(isAddModalOpen || isDeleteModalOpen) && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'>
          {isAddModalOpen && (
            <div className='bg-dark-800 border border-dark-600 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200'>
              <div className='p-6 border-b border-dark-700 flex justify-between items-center'>
                <h3 className='text-lg font-bold text-white'>Add/Edit Brand</h3>
                <button onClick={() => setIsAddModalOpen(false)} className='text-slate-400 hover:text-white'>
                  <X className='w-5 h-5' />
                </button>
              </div>
              <div className='p-6'>
                <p className='text-sm text-slate-400 mb-4'>Enter the details for the luxury brand partner.</p>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-xs font-bold text-slate-500 uppercase mb-2'>Brand Name</label>
                    <input
                      type='text'
                      placeholder='e.g. Creed'
                      className='w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent'
                    />
                  </div>
                </div>
              </div>
              <div className='p-6 border-t border-dark-700 flex justify-end gap-3'>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className='px-4 py-2 text-sm text-slate-300 hover:text-white font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className='px-4 py-2 text-sm bg-accent text-dark-900 font-bold rounded-lg hover:bg-yellow-400'
                >
                  Save Brand
                </button>
              </div>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className='bg-dark-800 border border-dark-600 rounded-xl shadow-2xl w-full max-w-md overflow-hidden text-center p-8'>
              <div className='w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500'>
                <AlertTriangle className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Delete Brand Confirmation</h3>
              <p className='text-slate-400 text-sm mb-8'>
                Are you sure you want to delete this brand? This action cannot be undone. All associated products will
                be permanently removed.
              </p>
              <div className='flex justify-center gap-3'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='px-6 py-2.5 text-sm bg-dark-700 text-white rounded-lg hover:bg-dark-600 border border-dark-600 font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='px-6 py-2.5 text-sm bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg shadow-red-900/20'
                >
                  Delete Brand
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
