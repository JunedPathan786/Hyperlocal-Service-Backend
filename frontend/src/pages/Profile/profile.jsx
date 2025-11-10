import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, loading } = useContext(AuthContext);

  // If no user is logged in, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-linear-to-r from-green-400 to-blue-500 px-6 py-8">
          <div className="flex items-center">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.fullname || user.email)}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">
                {user.name || user.fullname || 'User'}
              </h1>
              <p className="text-green-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <div className="border rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-800 font-medium">{user.name || user.fullname || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-800 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Role</label>
                  <p className="text-gray-800 font-medium capitalize">{user.role || 'User'}</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
              <div className="border rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Account Status</label>
                  <p className="text-gray-800 font-medium capitalize">Active</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
                  <p className="text-gray-800 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}