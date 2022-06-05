const style = {
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height:'90%',
        borderRadius: 5,
        boxShadow: 5,
        p:2,
        bgcolor: 'background.paper',
        overflow:'scroll',
        overflowX:'hidden',
        
    },
    container: {
        p: 2,
        height: '100%'
    },
    title: {
        alignSelf: 'center',
        mb: 4
    },
    panel_1: {
        height: '100%'
    },
    panel_2: {
        height: '100%',
        width: '100%'
    },
    leftStack: {
        p: 2,
        height: '100%',
        width: '90%',
    },
    leftStack_courseName: {
        fontWeight: 'bold',
        pt: 2,
        pl: 2,
        mb: 4
    },
    leftStack_introduceTitle: {
        fontWeight: 'bold',
        pt: 2,
        pl: 2,
    },
    leftStack_volumeCourse: {
        pt: 1,
        pl: 2,
        color: 'grey'
    },
    leftStack_totalLessons: {
        pt: 1,
        pl: 2,
        color: 'black',
        fontWeight: 'bold'
    },
    leftStack_courseDescription: {
        pl: 2,
        mb: 5
    },
    leftStack_infoCoursePanel: {
        mb: 2
    },
    leftStack_videoDemoPanel: {
        pl: 2
    },
    rightStack: {
        backgroundColor: 'blue',
        p: 2,
        height: '100%',
        width: '80%',
        mb: 2
    },
    rightStack_imgCourse: {
        width: '100%'
    },
    rightStack_registerButton: {
        fontSize: 12,
        backgroundColor: '#040E53'
    },
    rightStack_avatarLecturer: {
        height: 80,
        width: 80,
    },
    rightStack_nameLecturer: {
        m: 1
    }
}
export default style;