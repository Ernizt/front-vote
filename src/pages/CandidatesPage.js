import React, { useState } from 'react';
import { Checkbox, Button, List, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Измените на useNavigate
import axios from 'axios';
import Cookies from "js-cookie";
import { URLSERVER } from '../components/const';

const { Title } = Typography;

const candidatesList = [ 
  "Абдрахманов Нургазы Берикбаевич 1", "Алкан кызы Рыскул 2", 
  "Арстанбек уулу Улан 3", "Бактыбеков Баккелди Бакытбекович 4", 
  "Бейшенов Акбар Чынарбекович 5",  "Бектемир уулу Жоомарт 6",  
  "Болот уулу Эрнис 7",  "Жумабек уулу Бакыт 8",  
  "Иманалиев шабданбек Абдылдаевич 9", "Кубаталиев Максат Сатымбекович 10", 
  "Мамбеталиева Айниза Мансуровна 11",  "Момоканова Лиракан Аргынбековна 12",   
  "Осмоналиев Искендер Жумадилович 12",  "Сагынбек кызы Жанылбубу 14",
  "Сатаев Замирбек Сулиязович 15", "Стамалиев Маратбек Асаналиевич 16",  
  "Тургунбай уулу Аскат 17", "Турдалиев Назир Качкынбаевич 18",  
  "Хаписова Кумушай Талантбековна 19", "Чыналиев Тойчубек Жетибекович 20"
];

function CandidatesPage() {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const navigate = useNavigate(); // Измените на useNavigate

  const handleVote = async () => {
    const fullName = Cookies.get("fullName");

    if (selectedCandidates.length < 1 || selectedCandidates.length > 5) {
      message.error("1ден 5ке чейинки тандаңыз!");
      return;
    }

    try {
      await axios.post(URLSERVER +'/api/vote', { voterName: fullName, candidateIds: selectedCandidates });
      Cookies.set("isVoter", "1");
      navigate('/waiting'); // Измените на navigate
    } catch (error) {
      message.error("Произошла ошибка при отправке голоса!");
    }
  };

  const handleChange = (candidate) => {
    if (selectedCandidates.includes(candidate)) {
      setSelectedCandidates(selectedCandidates.filter(c => c !== candidate));
    } else {
      if (selectedCandidates.length < 5) {
        setSelectedCandidates([...selectedCandidates, candidate]);
      } else {
        message.error("Сиз 5 тен ашык  тандай аласыз!");
      }
    }
  };

  return (
    <div style={styles.container}>
      <Title level={2}>Талапкерди танданыз</Title>
      <List
        bordered
        dataSource={candidatesList}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              onChange={() => handleChange(item)}
              checked={selectedCandidates.includes(item)}
            >
              {item}
            </Checkbox>
          </List.Item>
        )}
      />
      <Button 
        onClick={handleVote} 
        type="primary" 
        style={{ marginTop: '20px' }}
        disabled={selectedCandidates.length < 1}
      >
        Голосовать
      </Button>
    </div>
  );
}

const styles = { container: { padding: '20px', minHeight: '100vh', backgroundColor: '#f0f2f5' } };
export default CandidatesPage;
