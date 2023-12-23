import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { FiEdit, FiCheck } from "react-icons/fi"; // Import icons from react-icons

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
  const [editingField, setEditingField] = useState(null);
  const [editMode, setEditMode] = useState(false); // New state variable for edit mode
  const [avatarEditMode, setAvatarEditMode] = useState(false);

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

  const handleEditClick = (fieldName) => {
    setEditingField(fieldName);
    setEditMode(true);
  };

  const handleSaveClick = async (fieldName) => {
    setEditingField(null);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, [fieldName]: profileData[fieldName] });

    if (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }

    setEditMode(false);
  };

  const handleAvatarEditClick = () => {
    setAvatarEditMode(true);
  };

  const handleAvatarSaveClick = async () => {
    setAvatarEditMode(false);
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: profileData.avatar_url })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating avatar:", error);
      alert("Error updating avatar: " + error.message);
    } else {
      alert("Avatar updated successfully!");
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const renderEditableField = (fieldName, fieldType = "text") => (
    <div className="relative mb-6 rounded bg-gray-800 p-4">
      {editingField === fieldName ? (
        fieldType === "textarea" ? (
          <textarea
            name={fieldName}
            value={profileData[fieldName]}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 text-white bg-transparent border-b border-white focus:outline-none focus:border-blue-500"
          ></textarea>
        ) : (
          <input
            type={fieldType}
            name={fieldName}
            value={profileData[fieldName]}
            onChange={handleChange}
            className="w-full p-2 text-white bg-transparent border-b border-white focus:outline-none focus:border-blue-500"
          />
        )
      ) : (
        <div className="flex items-center">
          <span className="text-white">
            {profileData[fieldName] || "Enter " + fieldName}
          </span>
          <button
            onClick={() => handleEditClick(fieldName)}
            className="ml-2 bg-transparent text-blue-500 hover:text-blue-600"
          >
            {editMode && editingField === fieldName ? <FiCheck /> : <FiEdit />}
          </button>
        </div>
      )}
    </div>
  );

  const renderAvatarField = () => (
    <div className="bg-black bg-opacity-40 p-4 flex flex-col items-center justify-start rounded-lg h-full">
      {avatarEditMode ? (
        <input
          type="text"
          name="avatar_url"
          value={profileData.avatar_url}
          onChange={handleChange}
          className="w-full p-2 text-white bg-transparent border-b border-white focus:outline-none focus:border-blue-500 mb-2"
        />
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
      <div className="flex items-center">
        <button
          onClick={
            avatarEditMode ? handleAvatarSaveClick : handleAvatarEditClick
          }
          className="text-white hover:text-blue-600"
        >
          {avatarEditMode ? <FiCheck /> : <FiEdit />}{" "}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-blue-900 flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-black bg-opacity-40 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          User Profile
        </h2>
        <div>
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
