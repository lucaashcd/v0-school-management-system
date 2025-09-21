// Local Storage management functions
class StorageManager {
  static getItem(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error getting item from storage:", error)
      return null
    }
  }

  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error("Error setting item in storage:", error)
      return false
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error removing item from storage:", error)
      return false
    }
  }

  // Initialize default data if not exists
  static initializeData() {
    // Initialize admins
    if (!this.getItem("admins")) {
      this.setItem("admins", [
        {
          id: 1,
          nome: "Admin Sistema",
          email: "admin@escola.com",
          cpf: "12345678901",
        },
      ])
    }

    // Initialize students
    if (!this.getItem("students")) {
      this.setItem("students", [])
    }

    // Initialize classes
    if (!this.getItem("classes")) {
      this.setItem("classes", [])
    }

    // Initialize courses
    if (!this.getItem("courses")) {
      this.setItem("courses", [])
    }
  }

  // CRUD operations for each entity
  static createStudent(student) {
    const students = this.getItem("students") || []
    student.id = Date.now()
    student.matricula = `MAT${student.id}`
    students.push(student)
    return this.setItem("students", students)
  }

  static getStudents() {
    return this.getItem("students") || []
  }

  static updateStudent(id, updatedStudent) {
    const students = this.getItem("students") || []
    const index = students.findIndex((s) => s.id === id)
    if (index !== -1) {
      students[index] = { ...students[index], ...updatedStudent }
      return this.setItem("students", students)
    }
    return false
  }

  static deleteStudent(id) {
    const students = this.getItem("students") || []
    const filteredStudents = students.filter((s) => s.id !== id)
    return this.setItem("students", filteredStudents)
  }

  static createClass(classData) {
    const classes = this.getItem("classes") || []
    classData.id = Date.now()
    if (!classData.capacidade) {
      classData.capacidade = 30
    }
    classes.push(classData)
    return this.setItem("classes", classes)
  }

  static getClasses() {
    return this.getItem("classes") || []
  }

  static updateClass(id, updatedClass) {
    const classes = this.getItem("classes") || []
    const index = classes.findIndex((c) => c.id === id)
    if (index !== -1) {
      classes[index] = { ...classes[index], ...updatedClass }
      return this.setItem("classes", classes)
    }
    return false
  }

  static deleteClass(id) {
    const classes = this.getItem("classes") || []
    const filteredClasses = classes.filter((c) => c.id !== id)
    return this.setItem("classes", filteredClasses)
  }

  static createCourse(course) {
    const courses = this.getItem("courses") || []
    course.id = Date.now()
    if (!course.area) {
      course.area = "Não especificada"
    }
    courses.push(course)
    return this.setItem("courses", courses)
  }

  static getCourses() {
    return this.getItem("courses") || []
  }

  static updateCourse(id, updatedCourse) {
    const courses = this.getItem("courses") || []
    const index = courses.findIndex((c) => c.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updatedCourse }
      return this.setItem("courses", courses)
    }
    return false
  }

  static deleteCourse(id) {
    const courses = this.getItem("courses") || []
    const filteredCourses = courses.filter((c) => c.id !== id)
    return this.setItem("courses", filteredCourses)
  }
}
