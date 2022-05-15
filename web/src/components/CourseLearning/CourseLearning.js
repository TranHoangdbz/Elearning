import './CourseLearning.scss';
import { Container, Grid } from '@mui/material'

function CourseLearning() {
    return (
        <Container spacing={2} style={{ marginTop: '40px' }} maxWidth='xl'>
            <Grid spacing={1} container>
                <Grid lg={8}>
                    {/* Layout left */}
                    <div className="video-container">
                        <iframe
                            width="100%" height="515"
                            src="https://www.youtube.com/embed/SlPhMPnQ58k"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        >
                        </iframe>
                        <div style={{ backgroundColor: 'red' }}> 1</div>
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
                </Grid>
                <Grid lg={4}>
                    {/* Layout right */}
                    <div style={{ paddingLeft: '20px' }}>
                        <div>.NET Advanced</div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CourseLearning