const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseList = document.querySelector('.course-list')
const courseCredits = document.querySelector('#course-credits')
const filterButtons = document.querySelectorAll('.filter-button')

function displayCourses(filter = 'all') {
    const filteredCourses = courses.filter(course =>
        filter === 'all' || course.subject === filter
    )

    courseList.replaceChildren()

    filteredCourses.forEach(course => {
        const courseItem = document.createElement('div')
        courseItem.classList.add(
            'course-item',
            course.completed ? 'course-item-completed' : 'course-item-incomplete'
        )
        courseItem.setAttribute(
            'aria-label',
            `${course.subject} ${course.number}, ${course.completed ? 'completed' : 'not completed'}`
        )

        const courseTitle = document.createElement('span')
        courseTitle.classList.add('course-title')

        if (course.completed) {
            const completionMark = document.createElement('span')
            completionMark.classList.add('course-completion-mark')
            completionMark.setAttribute('aria-hidden', 'true')
            completionMark.textContent = '✓ '
            courseTitle.append(completionMark)
        }

        courseTitle.append(`${course.subject} ${course.number}`)
        courseItem.append(courseTitle)
        courseList.append(courseItem)
    })

    const totalCredits = filteredCourses.reduce(
        (total, course) => total + course.credits,
        0
    )
    courseCredits.textContent = `Total credits shown: ${totalCredits}`
}

filterButtons.forEach(button => {
    button.addEventListener('click', event => {
        const selectedButton = event.currentTarget
        const selectedFilter = selectedButton.dataset.filter

        filterButtons.forEach(filterButton => {
            const isSelected = filterButton === selectedButton
            filterButton.classList.toggle('active', isSelected)
            filterButton.setAttribute('aria-pressed', String(isSelected))
        })

        displayCourses(selectedFilter)
    })
})

displayCourses()
