import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { FiEdit, FiCheck, FiX } from "react-icons/fi"; // Import icons from react-icons

const ProfilePage = () => {
  const { user, isLoggedIn } = useUser();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    age: "",
    job: "",
    avatar_url: "",
    biography: "",
    hobbies: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const fetchProfileData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile data:", error);
      } else {
        setProfileData(data);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, router, user?.id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...profileData,
    });

    if (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }

    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset profileData to its original state or refetch it if necessary
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const renderEditableField = (fieldName, fieldType = "text") => (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2">
        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
      </label>
      <div className="relative">
        {editMode ? (
          fieldType === "textarea" ? (
            <textarea
              name={fieldName}
              value={profileData[fieldName]}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 text-gray-800 bg-gray-200 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          ) : (
            <input
              type={fieldType}
              name={fieldName}
              value={profileData[fieldName]}
              onChange={handleChange}
              className="w-full p-2 text-gray-800 bg-gray-200 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
            />
          )
        ) : (
          <div className="flex items-center">
            <span className="text-gray-800">
              {profileData[fieldName] || "Enter " + fieldName}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderAvatarField = () => (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2">Avatar</label>
      <div className="relative">
        {editMode ? (
          <div className="flex items-center">
            <input
              type="text"
              name="avatar_url"
              value={profileData.avatar_url}
              onChange={handleChange}
              className="w-full p-2 text-gray-800 bg-gray-200 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full mb-4 overflow-hidden relative">
            <Image
              src={profileData.avatar_url || "/default-avatar.png"}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              unoptimized={true}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-blue-900 flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Profile
        </h2>
        <div>
          {editMode ? (
            <div className="mb-4">
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          )}
          {renderAvatarField()}
          {renderEditableField("name")}
          {renderEditableField("lastname")}
          {renderEditableField("age", "number")}
          {renderEditableField("job")}
          {renderEditableField("biography", "textarea")}
          {renderEditableField("hobbies", "textarea")}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
