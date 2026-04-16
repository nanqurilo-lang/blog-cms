"use client";

import { useEffect, useState } from "react";

const TABS = ["General", "Display Defaults", "Comments", "Privacy & Legal"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);


  const [settings, setSettings] = useState<any>({
    language: "",
    timezone: "",
    dateformat: "",
    showAuthorName: false,
    showpublishDate: false,
      showReadingTime: false, // ✅ ADD THIS

    cookieConsentEnabled: false,
    privacyPolicyUrl: "",
  });







  const BASE_URL = "https://w7xqb95q-3000.inc1.devtunnels.ms";

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("cms_token");

      const res = await fetch(`${BASE_URL}/api/admin/default-setting`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error("Error fetching settings", err);
    }
  };



const updateSettings = async () => {
  try {
    const token = localStorage.getItem("cms_token");

    if (!token) {
      alert("Authentication token missing ❌");
      return;
    }

    const payload = {
      ...settings,
      timezone: "UTC", // ✅ FIX format
      cookieConsentVersion: "1.0",
      cookieConsentExpiryDays: 365,
      cookieConsentBannerText:
        "We use cookies to enhance your experience.",
      showCookieRejectButton: false,
    };

    const res = await fetch(`${BASE_URL}/api/admin/default-setting`, {
      method: "PUT", // ⚠️ if still fails → change to PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });



    
    const data = await res.json();

    console.log("UPDATE RESPONSE 👉", data);

    if (res.ok) {
      alert("✅ Settings saved successfully!");
    } else {
      alert(data?.message || "Failed to update settings ❌");
    }
  } catch (err) {
    console.error("Update error", err);
    alert("Something went wrong ❌");
  }
};




  // ✅ 4. useEffect (👇 PASTE HERE)
  useEffect(() => {
    fetchSettings();
  }, []);


  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}


      {/* Tabs */}
      <div className="flex gap-20 border-b mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sections */}
      {/* {activeTab === "General" && (
        <General onChangePassword={() => setOpenPasswordModal(true)} />
      )} */}


      {activeTab === "General" && (
        <General
          settings={settings}
          setSettings={setSettings}
          updateSettings={updateSettings}
          onChangePassword={() => setOpenPasswordModal(true)}
        />
      )}


      {/* {activeTab === "Display Defaults" && <DisplayDefaults />}
      {activeTab === "Comments" && <Comments />}
      {activeTab === "Privacy & Legal" && <PrivacyLegal />} */}
      {activeTab === "Comments" && <Comments />}

   {activeTab === "Display Defaults" && (
  <DisplayDefaults
    settings={settings}
    setSettings={setSettings}
    updateSettings={updateSettings}
  />
)}

{activeTab === "Privacy & Legal" && (
  <PrivacyLegal
    settings={settings}
    setSettings={setSettings}
    updateSettings={updateSettings}
  />
)}
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





function Toggle({ value = false, onChange = () => {} }: any) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-10 h-6 rounded-full relative cursor-pointer ${
        value ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition ${
          value ? "right-1" : "left-1"
        }`}
      />
    </div>
  );
}





function SaveButton({ onClick }: any) {
  return (
    <div className="max-w-8xl flex justify-end">
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm"
      >
        Save Changes
      </button>
    </div>
  );
}



/* ------------------ General ------------------ */

// function General({ onChangePassword }: { onChangePassword: () => void }) {

function General({
  onChangePassword,
  settings,
  setSettings,
  updateSettings,
}: any) {

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
            {/* <Select value="English" /> */}
            <input
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="bg-gray-100 rounded-md px-4 py-2 text-sm w-full"
            />
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

      {/* <SaveButton /> */}
      <SaveButton onClick={updateSettings} />
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

function DisplayDefaults({ settings, setSettings,updateSettings }: any) {
  return (
    <>
      <Card
        title="Display Defaults"
        desc="Global defaults for reader experience. Can be overridden per post."
      >
        <div className="space-y-6">
          {/* <Row title="Show Author Name" desc="Display author name on blog posts" />
          <Row title="Show Publish Date" desc="Display publication date on posts" /> */}


          <Row
            title="Show Author Name"
            desc="Display author name on blog posts"
            value={settings.showAuthorName}
            onChange={(val: boolean) =>
              setSettings({ ...settings, showAuthorName: val })
            }
          />

          <Row
            title="Show Publish Date"
            desc="Display publication date on posts"
            value={settings.showpublishDate}
            onChange={(val: boolean) =>
              setSettings({ ...settings, showpublishDate: val })
            }
          />

<Row
  title="Show Reading Time"
  desc="Display estimated reading time"
  value={settings.showReadingTime}
  onChange={(val: boolean) =>
    setSettings({ ...settings, showReadingTime: val })
  }
/>


          {/* <Row title="Show Reading Time" desc="Display estimated reading time" /> */}
        </div>
      </Card>
      {/* <SaveButton /> */}

      <SaveButton onClick={updateSettings} />
    </>
  );
}




function Row({ title, desc, value, onChange }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>

      <Toggle value={value} onChange={onChange} />
    </div>
  );
}




type Comment = {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
};

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://w7xqb95q-3000.inc1.devtunnels.ms";

  useEffect(() => {
    fetchComments();
  }, []);

  
  const fetchComments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("cms_token"); // ✅ get token

      if (!token) {
        console.error("No token found ❌");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/comment/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ VERY IMPORTANT
        },
      });

      const data = await res.json();

      console.log("API RESPONSE 👉", data);

      if (data?.success) {
        const filtered = data.data.filter((c: any) => !c.isDeleted);
        setComments(filtered);
      } else {
        console.error("API Error:", data.message);
      }
    } catch (err) {
      console.error("Error fetching comments", err);
    } finally {
      setLoading(false);
    }
  };


  const deleteComment = async (id: string) => {
    try {
      const token = localStorage.getItem("cms_token");

      if (!token) {
        alert("Token missing ❌");
        return;
      }

      const confirmDelete = confirm("Are you sure you want to delete this comment?");
      if (!confirmDelete) return;

      const res = await fetch(`${BASE_URL}/api/comment/delete/${id}`, {
        method: "DELETE", // ✅ adjust if your API uses POST
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.success) {
        // ✅ remove from UI instantly
        setComments((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };





  return (
    <>
      <Card
        title="User Testimonials"
        desc="What users are saying about your blogs."
      >
        {loading ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments found.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex gap-4 items-start bg-gray-50"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                  {item.userId?.name?.charAt(0) || "U"}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">
                        {item.userId?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.userId?.email}
                      </p>
                    </div>


                    <div>



                      {/* DELETE ICON */}
                      <button
                        onClick={() => deleteComment(item._id)}
                        className="text-red-500 mt-4 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>

                    </div>

                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-700 mt-2">
                    {item.text}
                  </p>

                  {/* Extra Info */}
                  <p className="text-xs text-gray-400 mt-2">
                    User ID: {item.userId?._id}
                  </p>
                </div>

                <p className="text-xs mt-4 text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

              </div>
            ))}
          </div>
        )}
      </Card>

      <SaveButton />
    </>
  );
}



function PrivacyLegal({ settings, setSettings,updateSettings }: any) {
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
            {/* <Toggle /> */}

<Toggle
  value={settings.cookieConsentEnabled}
  onChange={(val: boolean) =>
    setSettings({ ...settings, cookieConsentEnabled: val })
  }
/>

          </div>

          <div>
            <label className="text-sm text-gray-600">
              Privacy Policy Page URL
            </label>
           

            <input
              value={settings.privacyPolicyUrl}
              onChange={(e) =>
                setSettings({ ...settings, privacyPolicyUrl: e.target.value })
              }
              className="bg-gray-100 rounded-md px-4 py-2 text-sm w-full"
            />


          </div>
        </div>
      </Card>

      {/* <SaveButton /> */}
      <SaveButton onClick={updateSettings} />
    </>
  );
}
