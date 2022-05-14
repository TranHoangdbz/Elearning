import './CourseLearning.scss';

function CourseLearning() {
    return (
        <div className='container'>
            <div className="video-container">
                <iframe 
                    width="916" height="515" 
                    src="https://www.youtube.com/embed/SlPhMPnQ58k" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                >    
                </iframe>
                <div className="ask-answer">
                    <div>
                        Bài giảng này khúc kia là sao đấy ạ
                    </div>
                    <div>
                        Bài giảng này khúc kia là sao đấy ạ
                    </div>
                    <div>
                        Bài giảng này khúc kia là sao đấy ạ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseLearning