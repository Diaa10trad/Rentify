import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function FilterSidebar({ type }) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  const filters = {
    منتج: {
      الفئات: [
        "أدوات ومعدات",
        "سيارات ومركبات",
        "الإلكترونيات",
        "أجهزة إلكترونية",
        "المطبخ والمنزل",
        "معدات البستنة",
        "أدوات رياضية",
        "أدوات الحيوانات الأليفة",
        "الفنون والحرف",
        "السفر والأمتعة",
        "الكرفانات",
        "الآلات الموسيقية",
        "الحفلات والمناسبات",
        "الملابس والبدلات",
        "المعدات الطبية",
        "ألعاب الطاولة والألغاز",
        "مستلزمات التعلم",
        "الألعاب الإلكترونية",
        "المركبات المائية",
        "أثاث المنزل",
        "مستلزمات المكتب",
        "معدات البناء",
        "معدات الصيد",
        "مستلزمات التخييم",
        "مستلزمات الخياطة",
      ],
      السعر: {
        يوميا: { من: 0, إلى: 0 },
        أسبوعيا: { من: 0, إلى: 0 },
        شهريا: { من: 0, إلى: 0 },
      },
      مدة_الاستئجار: {
        من: isoDate,
        إلى: isoDate,
        متصلة: false,
      },
      حالة_المنتج: ["بحالة الجديد", "جيد جدا", "جيد", "متوسط"],
      خيارات_الاستلام: [
        "الاستلام بمكان عام",
        "الاستلام من منزل المالك",
        "خدمة التوصيل",
      ],
      المسافة: 0,
      التقييم: [5, 4, 3, 2, 1],
      الكمية: 1,
    },
    خدمة: {},
  };

  const renderFormElement = (key, value) => {
    if (Array.isArray(value)) {
      return (
        <Form.Group key={key}>
          {value.map((item, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={item}
              id={`${key}-${index}`}
            />
          ))}
        </Form.Group>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div key={key}>
          {Object.entries(value).map(([subKey, subValue], subIndex) => (
            <div key={subIndex}>
              <Form.Label>{subKey}</Form.Label>
              {typeof subValue === "number" ? (
                <Form.Control
                  type="number"
                  placeholder={`Enter ${subKey}`}
                  defaultValue={subValue}
                />
              ) : (
                <>
                  <Form.Control
                    type="number"
                    placeholder={`From`}
                    defaultValue={subValue.from}
                  />
                  <Form.Control
                    type="number"
                    placeholder={`To`}
                    defaultValue={subValue.to}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === "number") {
      return (
        <Form.Group key={key}>
          <Form.Label>{key}</Form.Label>
          <Form.Control
            type="number"
            placeholder={`Enter ${key}`}
            defaultValue={value}
          />
        </Form.Group>
      );
    } else if (typeof value === "string") {
      return (
        <Form.Group key={key}>
          <Form.Label>{key}</Form.Label>
          <Form.Control
            type="date"
            placeholder={`Enter ${key}`}
            defaultValue={value}
          />
        </Form.Group>
      );
    }
    return null;
  };
  return (
    <Accordion className="w-100 shadow" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>تصفية</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Accordion className="mb-4" defaultActiveKey={["0"]} alwaysOpen>
              {Object.entries(filters[type]).map(([key, value], index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>{key}</Accordion.Header>
                  <Accordion.Body>
                    {renderFormElement(key, value)}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              {/* <Accordion.Item eventKey="0">
                <Accordion.Header>الفئات</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    {filters[type]["الفئات"].map((category, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={category}
                        id={category}
                      />
                    ))}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item> */}
              {/* delivery Options */}
              {/* <Accordion.Item eventKey="1">
                <Accordion.Header>خيارات الاستلام</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    {filters[type]["خيارات_الاستلام"].map((option, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={option}
                        id={option}
                      />
                    ))}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item> */}
              {/* Prices */}
              {/* <Accordion.Item eventKey="2">
                <Accordion.Header>السعر</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    {filters[type]["السعر"].map((category, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={category}
                        id={`category-${index}`}
                      />
                    ))}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item> */}
            </Accordion>
            <Button
              className="w-100 text-white"
              variant="primary"
              type="submit"
            >
              تصفية
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
