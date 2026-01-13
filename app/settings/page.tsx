"use client";

import { useState } from "react";

const TABS = ["General", "Display Defaults", "Comments", "Privacy & Legal"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      

      {/* Tabs */}
      <div className="flex gap-20 border-b mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sections */}
      {activeTab === "General" && (
        <General onChangePassword={() => setOpenPasswordModal(true)} />
      )}
      {activeTab === "Display Defaults" && <DisplayDefaults />}
      {activeTab === "Comments" && <Comments />}
      {activeTab === "Privacy & Legal" && <PrivacyLegal />}

      {/* Change Password Modal */}
      {openPasswordModal && (
        <ChangePasswordModal onClose={() => setOpenPasswordModal(false)} />
      )}
    </div>
  );
}

/* ------------------ UI Helpers ------------------ */

function Card({ title, desc, children }: any) {
  return (
    <div className="border rounded-xl p-6 max-w-8xl mb-6 bg-white">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      {children}
    </div>
  );
}

function Select({ value }: { value: string }) {
  return (
    <div className="bg-gray-100 rounded-md px-4 py-2 text-sm flex justify-between">
      {value}
      <span>⌄</span>
    </div>
  );
}

function Toggle() {
  return (
    <div className="w-10 h-6 bg-blue-600 rounded-full relative">
      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
    </div>
  );
}

function SaveButton() {
  return (
    <div className="max-w-8xl flex justify-end">
      <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm">
        Save Changes
      </button>
    </div>
  );
}

/* ------------------ General ------------------ */

function General({ onChangePassword }: { onChangePassword: () => void }) {
  return (
    <>
      <Card
        title="Profile Settings"
        desc="Manage your account profile information."
      >
        <div className="space-y-5">
          {/* Profile Picture */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Profile Picture</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  📷
                </div>
              </div>
              <div>
                <button className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm">
                  Upload Photo
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, JPEG
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <div className="bg-gray-100 rounded-md px-4 py-2 text-sm">
              John Doe
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email Id</label>
            <div className="bg-gray-100 rounded-md px-4 py-2 text-sm flex justify-between">
              johndoe@gmail.com
              <span>⌄</span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="mt-2">
              <button
                onClick={onChangePassword}
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="System Defaults"
        desc="These settings are used when new blogs are created. Safe to change anytime."
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Default Language</label>
            <Select value="English" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Default Timezone</label>
            <Select value="UTC (GMT+0)" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date Format</label>
            <Select value="MM/DD/YYYY" />
          </div>
        </div>
      </Card>

      <SaveButton />
    </>
  );
}

/* ------------------ Change Password Modal ------------------ */

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Current Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Other Tabs ------------------ */

function DisplayDefaults() {
  return (
    <>
      <Card
        title="Display Defaults"
        desc="Global defaults for reader experience. Can be overridden per post."
      >
        <div className="space-y-6">
          <Row title="Show Author Name" desc="Display author name on blog posts" />
          <Row title="Show Publish Date" desc="Display publication date on posts" />
          <Row title="Show Reading Time" desc="Display estimated reading time" />
        </div>
      </Card>
      <SaveButton />
    </>
  );
}

function Row({ title, desc }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <Toggle />
    </div>
  );
}

function Comments() {
  return (
    <p className="text-sm text-gray-500">
      🚧 Comments settings – <b>In future</b>
    </p>
  );
}

function PrivacyLegal() {
  return (
    <>
      <Card
        title="Privacy & Legal"
        desc="Platform-wide settings with no per-blog overrides."
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Cookie Consent Banner</p>
              <p className="text-xs text-gray-500">
                Show cookie consent notice to visitors
              </p>
            </div>
            <Toggle />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Privacy Policy Page URL
            </label>
            <div className="bg-gray-100 rounded-md px-4 py-2 text-sm text-gray-400">
              URL
            </div>
          </div>
        </div>
      </Card>

      <SaveButton />
    </>
  );
}
