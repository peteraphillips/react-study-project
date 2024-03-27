const Courses = ({courses}) => {

    var course = courses.map((course) => 
        <div key={course.id}>
            <h1>
                {course.name}
            </h1>
            {course.parts.map(course => 
                <p key={course.id}>
                    {course.name}{' '}
                    {course.exercises}
                </p>
            )}
            <strong>Total of 
                {' '}{course.parts.reduce((sum, part) => {
                    return sum + part.exercises
                }, 0)}{' '} 
                exercises
            </strong>
        </div>
    )

    return (
        course
    )

}

export default Courses