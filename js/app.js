// Main application initialization
class App {
  static init() {
    // Initialize storage with default data
    StorageManager.initializeData()

    // Set up global functions for table actions
    window.editStudent = this.editStudent
    window.deleteStudent = this.deleteStudent
    window.deleteClass = this.deleteClass
    window.deleteCourse = this.deleteCourse
    window.saveStudentEdit = this.saveStudentEdit
    window.filterStudents = this.filterStudents
    window.sortStudents = this.sortStudents

    // Bind entity registration forms
    this.bindEntityForms()

    this.bindFilterEvents()
    this.bindSearchEvents()

    // Start router
    window.Router.render()
  }

  static bindEntityForms() {
    document.addEventListener("submit", (e) => {
      if (e.target.id === "studentForm") {
        e.preventDefault()
        this.handleStudentSubmit()
      } else if (e.target.id === "classForm") {
        e.preventDefault()
        this.handleClassSubmit()
      } else if (e.target.id === "courseForm") {
        e.preventDefault()
        this.handleCourseSubmit()
      }
    })
  }

  static handleStudentSubmit() {
    const nome = document.getElementById("studentNome").value
    const idade = Number.parseInt(document.getElementById("studentIdade").value)
    const cpf = document.getElementById("studentCpf").value
    const turmaId = Number.parseInt(document.getElementById("studentTurma").value) || null
    const cursoId = Number.parseInt(document.getElementById("studentCurso").value) || null

    const student = { nome, idade, cpf, turmaId, cursoId }

    if (StorageManager.createStudent(student)) {
      window.Router.showAlert("Aluno cadastrado com sucesso!", "success")
      document.getElementById("studentForm").reset()
      // Refresh the page to show updated data
      setTimeout(() => window.Router.navigate("/cadastro-entidades"), 1000)
    } else {
      window.Router.showAlert("Erro ao cadastrar aluno", "danger")
    }
  }

  static handleClassSubmit() {
    const nome = document.getElementById("className").value
    const ano = Number.parseInt(document.getElementById("classYear").value)
    const turno = document.getElementById("classTurno").value
    const capacidade = Number.parseInt(document.getElementById("classCapacity").value) || 30

    const classData = { nome, ano, turno, capacidade }

    if (StorageManager.createClass(classData)) {
      window.Router.showAlert("Turma cadastrada com sucesso!", "success")
      document.getElementById("classForm").reset()
      setTimeout(() => window.Router.navigate("/cadastro-entidades"), 1000)
    } else {
      window.Router.showAlert("Erro ao cadastrar turma", "danger")
    }
  }

  static handleCourseSubmit() {
    const nome = document.getElementById("courseName").value
    const descricao = document.getElementById("courseDescription").value
    const area = document.getElementById("courseArea").value || "Não especificada"
    const duracao = Number.parseInt(document.getElementById("courseDuration").value) || null

    const course = { nome, descricao, area, duracao }

    if (StorageManager.createCourse(course)) {
      window.Router.showAlert("Curso cadastrado com sucesso!", "success")
      document.getElementById("courseForm").reset()
      setTimeout(() => window.Router.navigate("/cadastro-entidades"), 1000)
    } else {
      window.Router.showAlert("Erro ao cadastrar curso", "danger")
    }
  }

  static bindFilterEvents() {
    document.addEventListener("change", (e) => {
      if (e.target.id === "filterTurma" || e.target.id === "filterCurso") {
        this.filterStudents()
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.id === "clearFilters") {
        this.clearAllFilters()
      }
    })
  }

  static bindSearchEvents() {
    document.addEventListener("input", (e) => {
      if (e.target.id === "searchStudent") {
        this.searchStudents(e.target.value)
      } else if (e.target.id === "searchClass") {
        this.searchClasses(e.target.value)
      } else if (e.target.id === "searchCourse") {
        this.searchCourses(e.target.value)
      }
    })
  }

  static searchStudents(searchTerm) {
    const rows = document.querySelectorAll("#studentsTableContainer tbody tr")
    const searchLower = searchTerm.toLowerCase()
    let visibleCount = 0

    rows.forEach((row) => {
      const name = row.getAttribute("data-student-name") || ""
      const matricula = row.getAttribute("data-student-matricula") || ""

      const matches = name.includes(searchLower) || matricula.includes(searchLower)

      if (matches || searchTerm === "") {
        row.style.display = ""
        visibleCount++
      } else {
        row.style.display = "none"
      }
    })

    // Apply existing filters after search
    this.filterStudents()

    // Show/hide no results message
    const noResultsMsg = document.getElementById("noResultsMessage")
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 && searchTerm !== "" ? "block" : "none"
    }
  }

  static searchClasses(searchTerm) {
    const rows = document.querySelectorAll("#classesTableContainer tbody tr")
    const searchLower = searchTerm.toLowerCase()
    let visibleCount = 0

    rows.forEach((row) => {
      const name = row.getAttribute("data-class-name") || ""
      const turno = row.getAttribute("data-class-turno") || ""

      const matches = name.includes(searchLower) || turno.includes(searchLower)

      if (matches || searchTerm === "") {
        row.style.display = ""
        visibleCount++
      } else {
        row.style.display = "none"
      }
    })

    const noResultsMsg = document.getElementById("noClassesMessage")
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 && searchTerm !== "" ? "block" : "none"
    }
  }

  static searchCourses(searchTerm) {
    const rows = document.querySelectorAll("#coursesTableContainer tbody tr")
    const searchLower = searchTerm.toLowerCase()
    let visibleCount = 0

    rows.forEach((row) => {
      const name = row.getAttribute("data-course-name") || ""
      const area = row.getAttribute("data-course-area") || ""

      const matches = name.includes(searchLower) || area.includes(searchLower)

      if (matches || searchTerm === "") {
        row.style.display = ""
        visibleCount++
      } else {
        row.style.display = "none"
      }
    })

    const noResultsMsg = document.getElementById("noCoursesMessage")
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 && searchTerm !== "" ? "block" : "none"
    }
  }

  static filterStudents() {
    const turmaFilter = document.getElementById("filterTurma")?.value
    const cursoFilter = document.getElementById("filterCurso")?.value
    const rows = document.querySelectorAll("#studentsTableContainer tbody tr")
    let visibleCount = 0

    rows.forEach((row) => {
      // Skip if already hidden by search
      if (row.style.display === "none") return

      const turmaId = row.getAttribute("data-turma-id")
      const cursoId = row.getAttribute("data-curso-id")

      let showRow = true

      if (turmaFilter && turmaId !== turmaFilter) {
        showRow = false
      }

      if (cursoFilter && cursoId !== cursoFilter) {
        showRow = false
      }

      if (showRow) {
        row.style.display = ""
        visibleCount++
      } else {
        row.style.display = "none"
      }
    })

    // Update no results message
    const noResultsMsg = document.getElementById("noResultsMessage")
    if (noResultsMsg) {
      const hasFilters = turmaFilter || cursoFilter || document.getElementById("searchStudent")?.value
      noResultsMsg.style.display = visibleCount === 0 && hasFilters ? "block" : "none"
    }
  }

  static clearAllFilters() {
    // Clear filter dropdowns
    const turmaFilter = document.getElementById("filterTurma")
    const cursoFilter = document.getElementById("filterCurso")
    const searchInput = document.getElementById("searchStudent")

    if (turmaFilter) turmaFilter.value = ""
    if (cursoFilter) cursoFilter.value = ""
    if (searchInput) searchInput.value = ""

    // Show all rows
    const rows = document.querySelectorAll("#studentsTableContainer tbody tr")
    rows.forEach((row) => {
      row.style.display = ""
    })

    // Hide no results message
    const noResultsMsg = document.getElementById("noResultsMessage")
    if (noResultsMsg) {
      noResultsMsg.style.display = "none"
    }
  }

  static sortStudents(column) {
    const tbody = document.querySelector("#studentsTableContainer tbody")
    if (!tbody) return

    const rows = Array.from(tbody.querySelectorAll("tr"))

    rows.sort((a, b) => {
      let aValue, bValue

      switch (column) {
        case "nome":
          aValue = a.querySelector("td:nth-child(2)").textContent.trim()
          bValue = b.querySelector("td:nth-child(2)").textContent.trim()
          break
        case "idade":
          aValue = Number.parseInt(a.querySelector("td:nth-child(3)").textContent)
          bValue = Number.parseInt(b.querySelector("td:nth-child(3)").textContent)
          break
        case "matricula":
          aValue = a.querySelector("td:nth-child(1)").textContent.trim()
          bValue = b.querySelector("td:nth-child(1)").textContent.trim()
          break
        default:
          return 0
      }

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue)
      }
      return aValue - bValue
    })

    // Clear tbody and append sorted rows
    tbody.innerHTML = ""
    rows.forEach((row) => tbody.appendChild(row))
  }

  static editStudent(id) {
    const students = StorageManager.getStudents()
    const student = students.find((s) => s.id === id)

    if (student) {
      // Populate modal fields
      document.getElementById("editStudentId").value = student.id
      document.getElementById("editStudentNome").value = student.nome
      document.getElementById("editStudentIdade").value = student.idade
      document.getElementById("editStudentCpf").value = student.cpf
      document.getElementById("editStudentTurma").value = student.turmaId || ""
      document.getElementById("editStudentCurso").value = student.cursoId || ""

      // Show modal (using Bootstrap 5 modal)
      const modal = new window.bootstrap.Modal(document.getElementById("editStudentModal"))
      modal.show()
    }
  }

  static saveStudentEdit() {
    const id = Number.parseInt(document.getElementById("editStudentId").value)
    const nome = document.getElementById("editStudentNome").value
    const idade = Number.parseInt(document.getElementById("editStudentIdade").value)
    const cpf = document.getElementById("editStudentCpf").value
    const turmaId = Number.parseInt(document.getElementById("editStudentTurma").value) || null
    const cursoId = Number.parseInt(document.getElementById("editStudentCurso").value) || null

    const updatedStudent = { nome, idade, cpf, turmaId, cursoId }

    if (StorageManager.updateStudent(id, updatedStudent)) {
      window.Router.showAlert("Aluno atualizado com sucesso!", "success")
      // Hide modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById("editStudentModal"))
      modal.hide()
      // Refresh page
      setTimeout(() => window.Router.navigate("/home"), 1000)
    } else {
      window.Router.showAlert("Erro ao atualizar aluno", "danger")
    }
  }

  static deleteStudent(id) {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      if (StorageManager.deleteStudent(id)) {
        window.Router.showAlert("Aluno excluído com sucesso!", "success")
        window.Router.navigate("/home")
      }
    }
  }

  static deleteClass(id) {
    if (confirm("Tem certeza que deseja excluir esta turma?")) {
      if (StorageManager.deleteClass(id)) {
        window.Router.showAlert("Turma excluída com sucesso!", "success")
        window.Router.navigate("/home")
      }
    }
  }

  static deleteCourse(id) {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      if (StorageManager.deleteCourse(id)) {
        window.Router.showAlert("Curso excluído com sucesso!", "success")
        window.Router.navigate("/home")
      }
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init()
})
