import './CourseLearning.scss';
import { Container, Grid, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import CardCourse from './components/CardCourse';

const mockCourses = [
    {
        stt: 1,
        unClock: true,
        name: 'A summary about .NET',
        time: '5min'
    },
    {
        unClock: true,
        stt: 2,
        name: 'Exception filters',
        time: '10min'

    },
    {
        unClock: true,
        stt: 3,
        name: 'ref keyword',
        time: '8min'

    },
    {
        unClock: true,
        stt: 4,
        name: 'Finalizers',
        time: '16min'

    },
    {
        stt: 5,
        unClock: false,
        name: 'Struct layout',
        time: '14min'

    },
    {
        unClock: false,
        stt: 6,
        name: 'Multi threads',
        time: '17min'

    },
    {
        unClock: false,
        stt: 7,
        name: 'Background workers',
        time: '20min'

    },
    {
        unClock: false,
        stt: 8,
        name: 'A summary about .NET',
        time: '10min'
    },

]

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
                    <div className='layout-right'>
                        <div className='name-course' style={{ fontFamily: "'Montserrat', san-serif" }}>.NET Advanced</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div className='students' style={{ fontFamily: "'Montserrat', san-serif" }}>10k students</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='rating' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ marginRight: '10px', marginTop: '0', marginBottom: '0', fontFamily: "'Montserrat', san-serif" }}>4.8</p>
                                    <StarIcon style={{ color: '#FFD601' }}></StarIcon>
                                </div>
                                <div className='view' style={{ display: 'flex', justifyContent: 'center', fontFamily: "'Montserrat', san-serif" }}>
                                    123 reviews
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div style={{ display: 'flex', marginTop:'10px' }}>
                                <Avatar height={50} width={50} alt="Remy Sharp" src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/9/photo-1-16257989599561090737937.jpeg" />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent:'center' }}>
                                    <div className='name' style={{ fontFamily: "'Montserrat', san-serif" }}>Json Wong</div>
                                    <div className='major' style={{ fontFamily: "'Montserrat', san-serif" }}>Sr Software Engineer</div>
                                </div>
                            </div>
                            <div className='enroll' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', fontFamily: "'Montserrat', san-serif" }}>
                                Enroll
                            </div>

                        </div>
                        <div style={{ display: 'flex', paddingLeft: '25px', marginTop: '12px', paddingRight: '25px' }}>
                            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                                This class will teach you some advanced C# and .NET skill as well as a full implementation of
                                .NET Framework for your future application.
                            </div>
                        </div>
                        <div className='list-course'>
                            {
                                mockCourses.map((course) => (
                                    <CardCourse course={course}></CardCourse>
                                ))
                            }
                          
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CourseLearning