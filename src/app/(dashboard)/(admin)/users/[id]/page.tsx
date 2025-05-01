'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChevronLeft, Mail, Building2, Calendar, Shield, Edit2, Trash2, PowerOff, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  company_name: string
  role: string
  is_active: boolean
  last_login: string | null
  failed_login_attempts: number
  is_locked: boolean
  created_at: string
  job_title: string
  company_size: string
}

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editForm, setEditForm] = useState<Partial<User>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUser()
  }, [resolvedParams.id])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) throw error

      setUser(data)
      setEditForm(data)
    } catch (error) {
      console.error('Error fetching user:', error)
      setError('Failed to load user details')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          role: editForm.role,
          job_title: editForm.job_title
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      setUser({ ...user, ...editForm } as User)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const toggleUserStatus = async () => {
    try {
      const newStatus = !user?.is_active
      const { error } = await supabase
        .from('users')
        .update({ is_active: newStatus })
        .eq('id', resolvedParams.id)

      if (error) throw error

      setUser({ ...user, is_active: newStatus } as User)
    } catch (error) {
      console.error('Error toggling user status:', error)
    }
  }

  const deleteUser = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', resolvedParams.id)

      if (error) throw error

      router.push('/users')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const unlockAccount = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          is_locked: false,
          failed_login_attempts: 0
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      setUser({ ...user, is_locked: false, failed_login_attempts: 0 } as User)
    } catch (error) {
      console.error('Error unlocking account:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          {error || 'User not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-base">{user.first_name} {user.last_name}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500/30 text-gray-400 hover:bg-gray-500/50 hover:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
            >
              <Edit2 size={20} className="mr-2" />
              Edit User
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Account Status</h3>
            <Shield className={user.is_active ? 'text-green-400' : 'text-red-400'} size={20} />
          </div>
          <p className="text-2xl font-semibold">{user.is_active ? 'Active' : 'Inactive'}</p>
          <p className="text-sm text-gray-400">
            {user.is_locked ? 'Account locked' : 'Account unlocked'}
          </p>
        </div>

        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Last Login</h3>
            <Calendar className="text-blue-400" size={20} />
          </div>
          <p className="text-2xl font-semibold">
            {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
          </p>
          <p className="text-sm text-gray-400">
            Failed attempts: {user.failed_login_attempts}
          </p>
        </div>

        <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Role</h3>
            <Shield className="text-purple-400" size={20} />
          </div>
          <p className="text-2xl font-semibold capitalize">{user.role}</p>
          <p className="text-sm text-gray-400">Member since {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            {/* User Information - Left Column */}
            <div>
              <h2 className="text-lg font-semibold mb-4">User Information</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2"
                        value={editForm.first_name}
                        onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2"
                        value={editForm.last_name}
                        onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Role</label>
                      <select
                        className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2"
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Job Title</label>
                      <input
                        type="text"
                        className="w-full bg-[#0d0f12] border border-gray-800 rounded-lg px-3 py-2"
                        value={editForm.job_title}
                        onChange={(e) => setEditForm({ ...editForm, job_title: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm font-medium">Company</p>
                        <p className="text-sm text-gray-400">{user.company_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm font-medium">Job Title</p>
                        <p className="text-sm text-gray-400">{user.job_title || 'Not specified'}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Account Management - Right Column */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Account Management</h2>
              <div className="space-y-4">
                {/* Account Status Toggle */}
                <div className="bg-[#0d0f12] rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Account Status</h3>
                      <p className="text-sm text-gray-400">
                        {user.is_active ? 'User can currently access the platform' : 'User is currently blocked from accessing the platform'}
                      </p>
                    </div>
                    <button
                      onClick={toggleUserStatus}
                      className={`${
                        user.is_active
                          ? 'bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/50'
                          : 'bg-green-500/30 text-green-400 hover:bg-green-500/50'
                      } font-medium py-2 px-4 rounded-lg flex items-center transition-colors`}
                    >
                      <PowerOff size={20} className="mr-2" />
                      {user.is_active ? 'Deactivate Account' : 'Activate Account'}
                    </button>
                  </div>
                </div>

                {/* Account Security */}
                {user.is_locked && (
                  <div className="bg-[#0d0f12] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Account Locked</h3>
                        <p className="text-sm text-gray-400">
                          Account has been locked due to {user.failed_login_attempts} failed login attempts
                        </p>
                      </div>
                      <button
                        onClick={unlockAccount}
                        className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                      >
                        <Shield size={20} className="mr-2" />
                        Unlock Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Danger Zone */}
                <div className="bg-[#0d0f12] rounded-lg p-6 border border-red-900/50">
                  <h3 className="text-base font-medium mb-4 text-red-400">Danger Zone</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Delete User Account</p>
                      <p className="text-sm text-gray-400">
                        Permanently remove this user and all associated data
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-500/30 text-red-400 hover:bg-red-500/50 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                    >
                      <Trash2 size={20} className="mr-2" />
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete User</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500/30 text-red-400 hover:bg-red-500/50 px-4 py-2 rounded-lg transition-colors"
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 