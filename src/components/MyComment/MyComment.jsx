import meme1 from '../../assets/images/photo_2023-10-24 18.27.54.jpeg'
import meme2 from '../../assets/images/photo_2023-10-24 18.28.10.jpeg'
import meme3 from '../../assets/images/photo_2023-10-24 18.28.16.jpeg'
import meme4 from '../../assets/images/photo_2023-10-24 18.28.24.jpeg'
import meme5 from '../../assets/images/photo_2023-10-24 18.28.30.jpeg'
import meme6 from '../../assets/images/photo_2023-10-24 18.28.47.jpeg'
import meme7 from '../../assets/images/photo_2023-10-24 18.28.36.jpeg'
import meme8 from '../../assets/images/photo_2023-10-24 18.28.53.jpeg'



const MyComment = () => {
  return (
    <div className="comment">
      <div className="memeses">
        <img className='meme' src={meme1} alt="memeses" />
        <img className='meme' src={meme2} alt="memeses" />
        <img className='meme' src={meme3} alt="memeses" />
        <img className='meme' src={meme4} alt="memeses" />
        <img className='meme' src={meme5} alt="memeses" />
        <img className='meme' src={meme6} alt="memeses" />
        <img className='meme' src={meme7} alt="memeses" />
        <img className='meme' src={meme8} alt="memeses" />
        <p>Чому сис адмін сука? Теж з кабелями їбеться</p>

      </div>
      <div className="text">
        Привіт, мене звати Владислав і я хочу подякувати за тестове завдання, це
        був ціавий досвід! Хоч і без Тайпскрипту, я хочу і готовий розвиватись
        постійно, щоб стати частинкою вашої команди. Повірте, мотивації в мене
        найбільше серед усіх кандидатів, на це є свої причини. Я-молодий та
        амбітний, а ще "Птица Говорун отличается умом и сообразительностью, умом
        и сообразительностью" Сподіваюсь, все буде добре і побачимось на
        технічному інтерв'ю, а поки ловіть підбірку мемів
      </div>
    </div>
  );
};

export default MyComment;
