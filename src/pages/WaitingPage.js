import React from 'react';
import { Image } from 'antd';

function WaitingPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
         <Image
        width={200} // ширина изображения
        src="https://memi.klev.club/uploads/posts/2024-05/memi-klev-club-vnou-p-memi-zhdushchii-chelovek-30.jpg" // URL-адрес или локальный путь
        alt="Описание картинки"
      />
      <h2>Сиздин добушуңуз саналды.</h2>
      <p>Сураныч, натыйжаны күтүңүз.</p>
    </div>
  );
}

export default WaitingPage;