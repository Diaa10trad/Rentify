import { Form, Button } from "react-bootstrap";
import ChangeImage from "@/components/Profile/ChangeImage";
function SettingsForm({ user, setUser }) {
  const handleAvatarChange = (newAvatar) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatar,
    }));
  };
  return (
    <Form>
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
          onChange={(e) => setUser({ ...prev, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="m-4">
        <Form.Label>رقم الهاتف</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={(e) => setUser({ ...prev, phoneNumber: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="m-4">
        <Form.Label>كلمة السر</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...prev, password: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="d-flex flex-column m-4">
        <Form.Label>
          <p>
            التحقق من الهوية
            <span className="fs-6 text-danger"> (غير محقق)</span>
          </p>
        </Form.Label>
        <Button
          variant="none"
          size="sm"
          style={{ width: "fit-content" }}
          className="text-primary border"
          onClick={() => document.getElementById("IDInput").click()}
        >
          اضف وثيقة
        </Button>
        <Form.Control type="file" id="IDInput" style={{ display: "none" }} />
      </Form.Group>
      <Button className="m-4 text-white" variant="primary" type="submit">
        حفظ التغييرات
      </Button>
    </Form>
  );
}

export default SettingsForm;
