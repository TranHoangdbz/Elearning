import { Avatar, Button, Grid, Stack, Typography } from '@mui/material'
import style from './style';

const DemoCourse = () => {
    return (
        <Stack>
            <Stack sx={{height: 50, backgroundColor: 'red', width:'100%'}}>Header Here</Stack>
            <Grid container sx={style.container}>
                <Grid container item xs={8} sx={style.panel_1}>
                    <Stack sx={style.leftStack}>
                        <Typography variant='h4' sx={style.leftStack_courseName}>Hồi quy tuyến tính</Typography>
                        <Typography variant='h6' sx={style.leftStack_courseDescription}>
                            Khái niệm hồi qui dùng để mô tả quan hệ thống kê giữa các biến.
                            Để “đọc” được mối liên hệ giữa X và Y và dự đoán được Y khi biết giá trị của X
                            người ta theo các bước sau:
                            • Biểu diễn mỗi quan sát (xi
                            ; yi) bởi một điểm trên mặt phẳng toạ độ, ta còn
                            gọi nó là đồ thị phân tán
                            • “Vẽ” một đường cong để mô tả mối quan hệ giữa hai đại lượng và dùng nó
                            để dự đoán xu hướng của Y cũng như giá trị của nó khi biết giá trị của X.
                            Đường cong như vậy được gọi là đường hồi quy (hay đường cong xấp xỉ).
                            Thuật toán hồi quy tuyến tính thuộc vào nhóm học có giám sát (supervised

                        </Typography>
                        <Typography variant='h4' sx={style.leftStack_introduceTitle}>Introduce to Course</Typography>
                        <Stack direction='row' sx={style.leftStack_infoCoursePanel}>
                            <Typography variant='subtitle2' sx={style.leftStack_volumeCourse}>4 hours 20 mins • </Typography>
                            <Typography variant='subtitle2' sx={style.leftStack_totalLessons}>10 lessons</Typography>
                        </Stack>
                        <Stack sx={style.leftStack_videoDemoPanel}>
                            <iframe className="frame"
                                src={'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com%22%20frameborder=%220%22'}
                                height='400'
                                title="video"
                                style={{ borderRadius: 20 }}
                            ></iframe>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid container item xs={4} sx={style.panel_2}>
                    <Stack sx={style.rightStack}>
                        <img style={style.rightStack_imgCourse} src='https://img.freepik.com/free-vector/digital-designers-team-drawing-with-pen-computer-monitor_74855-10586.jpg?t=st=1653274227~exp=1653274827~hmac=374bc6fa6a996cc6f01e67f46d033c8727107092e6ac23d8325b0f1a0d67f8ca&w=1060'></img>
                        <Button variant="contained" style={style.rightStack_registerButton} >REGISTER</Button>
                        <Stack direction={'column'} sx={{justifyContent:'center', alignItems: 'center',justifySelf:'center',height:'50vh',mt:2}}>
                            <Avatar sx={style.rightStack_avatarLecturer}  src='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'/>
                            <Typography sx={style.rightStack_nameLecturer} variant='h5' fontWeight={'bold'}>Thien Fam</Typography>
                            <Typography variant='h5'>Senior UI/UX Design</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}
export default DemoCourse;