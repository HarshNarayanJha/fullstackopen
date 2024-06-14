const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Total = (props) => <b> total of {props.parts.reduce((total, part) => { return total + part.exercises }, 0)} exercises</b>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Cirriculum</h1>
      {courses.map(course => {
        return (<>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </>)
      })}
    </div>
  )
}

export default Course