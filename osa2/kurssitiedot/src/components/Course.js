import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h2> {course.name}</h2>
    )
}

const Content = ({ course }) => {
    console.log('content', course);
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => {
    console.log('part', part)
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}



const Total = ({ course }) => {
    console.log('total', course)
    /*
    let totalExercises = 0
    course.parts.map(part => totalExercises += part.exercises)
    */
    const totalEx = course.parts.reduce((s, p) => {
        return (
            s + p.exercises
        )
    }, 0)
    console.log('totalEx', totalEx)

    return (
        <h4>
            Number of exercises {totalEx}
        </h4>
    )
}

export default Course