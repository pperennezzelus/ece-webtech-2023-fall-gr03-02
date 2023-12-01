import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";

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
    <div className="flex items-center py-2">
      <span className="font-medium mr-2">
        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
      </span>
      {editingField === fieldName ? (
        fieldType === "textarea" ? (
          <textarea
            name={fieldName}
            value={profileData[fieldName]}
            onChange={handleChange}
            rows={3}
            className="text-sm flex-grow mr-2"
          ></textarea>
        ) : (
          <input
            type={fieldType}
            name={fieldName}
            value={profileData[fieldName]}
            onChange={handleChange}
            className="text-sm flex-grow mr-2"
          />
        )
      ) : (
        <span
          className={`flex-grow text-sm ${
            !profileData[fieldName] ? "text-gray-400" : ""
          }`}
        >
          {profileData[fieldName] ||
            (fieldType === "textarea" ? "Enter " + fieldName : "")}
        </span>
      )}
      <button
        onClick={() =>
          editingField === fieldName
            ? handleSaveClick(fieldName)
            : handleEditClick(fieldName)
        }
        className="text-gray-500 hover:text-blue-600"
      >
        {editingField === fieldName ? "✓" : "✏️"}
      </button>
    </div>
  );

  const renderAvatarField = () => (
    <div className="bg-blue-500 p-4 flex flex-col items-center justify-start rounded-l-lg h-full">
      {avatarEditMode ? (
        <input
          type="text"
          name="avatar_url"
          value={profileData.avatar_url}
          onChange={handleChange}
          className="text-sm mb-2"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mb-4 overflow-hidden relative">
          <Image
            src={profileData.avatar_url || "/default-avatar.png"}
            alt="Avatar"
            layout="fill" // This tells Next.js to fill the parent container
            objectFit="cover" // This scales the image nicely to cover the area
            unoptimized={true}
          />
        </div>
      )}
      <button
        onClick={avatarEditMode ? handleAvatarSaveClick : handleAvatarEditClick}
        className="text-gray-500 hover:text-blue-600"
      >
        {avatarEditMode ? "✓" : "✏️"}
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex rounded-lg shadow-md overflow-hidden">
        <div className="w-1/3">{renderAvatarField()}</div>
        <div className="flex-grow bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
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
