import picture from '../assets/pic.jpg';

const WordofDay = () => {
  return (
    <div className="word-of-day-card">
        <h2>Word of the Day</h2>
        <h3>Serendipity</h3>
        <p><strong>Meaning:</strong> The occurrence of events by chance in a happy or beneficial way.</p>
        <p><strong>Example:</strong> "Finding that book in the library was pure serendipity."</p>

        <img src={picture} alt="Serendipity Illustration" className="word-image" />
    </div>
  );
}

export default WordofDay;