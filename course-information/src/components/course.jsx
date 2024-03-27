const Course = ({course}) => {

    var totalAmount = course.parts.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)

    return ( 
        <div>
            <h1>
                {course.name}
            </h1>
            {course.parts.map(course => 
                <p key={course.id}>
                    {course.name}{' '}
                    {course.exercises}
                </p>
            )}
            <p>Total of {totalAmount} exercises</p>
        </div>
    )
}

export default Course