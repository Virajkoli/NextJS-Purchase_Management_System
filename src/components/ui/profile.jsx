import { useState } from "react";
const SideProfile = ({ formData, setFormData, session }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleEditProfileSubmit = async () => {
    if (!otpSent) {
      alert("OTP sent to your email!");
      setOtpSent(true);
      return;
    }

    alert("Profile updated successfully!");
    setIsEditingProfile(false);
    setOtpSent(false);
  };

  return (
    <div className="w-1/5 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-2">
        <span className="font-medium">Name:</span> {session?.user?.name}
      </p>
      <p className="mb-2">
        <span className="font-medium">Email:</span> {session?.user?.email}
      </p>
      <p className="mb-6">
        <span className="font-medium">Role:</span> {session?.user?.role}
      </p>
      <button
        onClick={() => setIsEditingProfile(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Edit Profile
      </button>

      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter new name"
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter new password"
            />
            {otpSent && (
              <input
                type="text"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter OTP"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditingProfile(false);
                  setOtpSent(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfileSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {otpSent ? "Update Profile" : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideProfile;
