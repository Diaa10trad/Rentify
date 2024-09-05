import { Form, Button } from "react-bootstrap";
import ChangeImage from "@/components/Profile/ChangeImage";
import axios from "axios";
import { getToken } from "@/utils/AuthUtils";
function SettingsForm({ user, setUser }) {
  const handleAvatarChange = (newAvatar) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatar,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    try {
      const formData = new FormData();
      if (user.email) formData.append("email", user.email);
      if (user.oldPassword) formData.append("oldPassword", user.oldPassword);
      if (user.newPassword) formData.append("newPassword", user.newPassword);
      formData.append("avatar", user.avatar);

      const response = await axios.put(
        "http://localhost:5079/api/account/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the auth token
            "Content-Type": "multipart/form-data", // Since we are uploading an image
          },
        }
      );

      setUser(response.data);
      alert("تم تحديث الإعدادات. قم بتحديث الصفحة.");
    } catch (error) {
      if (error.response.data == "Incorrect old password")
        alert("فشل تحديث الإعدادات: كلمة السر القديمة غير صحيحة");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ChangeImage
        userAvatar={user.avatar}
        setUserAvatar={handleAvatarChange}
      />
      <Form.Group className="m-4">
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className="m-4">
        <Form.Label>كلمة السر الحالية</Form.Label>
        <Form.Control
          type="password"
          name="oldPassword"
          value={user.oldPassword}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, oldPassword: e.target.value }))
          }
        />
      </Form.Group>
      <Form.Group className="m-4">
        <Form.Label>كلمة السر الجديدة</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={user.newPassword}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, newPassword: e.target.value }))
          }
        />
      </Form.Group>
      <Button className="m-4 text-white" variant="primary" type="submit">
        حفظ التغييرات
      </Button>
    </Form>
  );
}

export default SettingsForm;
