import React, { useState } from "react";
import { Input, Button, Card, Form, Typography, Checkbox, message } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Измените на useNavigate

const { Title } = Typography;

const NamePage = () => {
  const [fullName, setFullName] = useState("");
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate(); // Измените на useNavigate

  const handleSubmit = () => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      message.error("Туура эмес маалымат киргизилген");
      return;
    }
    if (!consent) {
      message.error("Сураныч, маалыматтарды чогултууга макулдук бериңиз!");
      return;
    }

    Cookies.set("fullName", fullName);
    Cookies.set("isVoter", "1"); // Добавьте значение для куки
    console.log("Redirecting to /candidates"); // Для отладки
    navigate("/candidates"); // Измените на navigate
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3} style={styles.title}>Маалыматыңызды киргизиңиз</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Атыныз жан Фамилия" required>
            <Input 
              placeholder="Введите имя и фамилию" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
            />
          </Form.Item>
          <Form.Item>
            <Checkbox 
              checked={consent} 
              onChange={(e) => setConsent(e.target.checked)}
            >
              Сураныч, маалыматтарды чогултууга макулдук бериниз!
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>Улантуу</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #f0f2f5, #ffffff)"
  },
  card: { width: 400, padding: 24 },
  title: { textAlign: "center", marginBottom: 24 },
  button: { width: "100%" }
};

export default NamePage;
