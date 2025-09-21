// Simple router for navigation
class Router {
  static currentRoute = "/login"
  static routes = {
    "/login": () => window.Components.renderLogin(),
    "/cadastro": () => window.Components.renderAdminRegister(),
    "/home": () => window.Components.renderAdminHome(),
    "/cadastro-entidades": () => window.Components.renderEntityRegistration(),
    "/loginAluno": () => window.Components.renderStudentLogin(),
    "/homeAluno": () => window.Components.renderStudentHome(),
  }

  static navigate(route) {
    this.currentRoute = route
    this.render()
  }

  static render() {
    const app = document.getElementById("app")
    const renderFunction = this.routes[this.currentRoute]

    if (renderFunction) {
      app.innerHTML = renderFunction()
      this.bindEvents()
    } else {
      app.innerHTML = '<div class="alert alert-danger">Página não encontrada</div>'
    }
  }

  static bindEvents() {
    // Bind navigation events
    document.querySelectorAll("[data-route]").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault()
        const route = e.target.getAttribute("data-route")
        this.navigate(route)
      })
    })

    // Bind form events
    this.bindFormEvents()
  }

  static bindFormEvents() {
    // Admin login form
    const adminLoginForm = document.getElementById("adminLoginForm")
    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const cpf = document.getElementById("cpf").value

        const result = window.AuthManager.loginAdmin(email, cpf)
        if (result.success) {
          this.navigate("/home")
        } else {
          this.showAlert(result.message, "danger")
        }
      })
    }

    // Student login form
    const studentLoginForm = document.getElementById("studentLoginForm")
    if (studentLoginForm) {
      studentLoginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const matricula = document.getElementById("matricula").value
        const cpf = document.getElementById("cpf").value

        const result = window.AuthManager.loginStudent(matricula, cpf)
        if (result.success) {
          this.navigate("/homeAluno")
        } else {
          this.showAlert(result.message, "danger")
        }
      })
    }

    // Admin registration form
    const adminRegisterForm = document.getElementById("adminRegisterForm")
    if (adminRegisterForm) {
      adminRegisterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const nome = document.getElementById("nome").value
        const email = document.getElementById("email").value
        const cpf = document.getElementById("cpf").value

        const result = window.AuthManager.registerAdmin(nome, email, cpf)
        this.showAlert(result.message, result.success ? "success" : "danger")

        if (result.success) {
          setTimeout(() => this.navigate("/login"), 2000)
        }
      })
    }

    // Logout buttons
    document.querySelectorAll(".logout-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.AuthManager.logout()
      })
    })
  }

  static showAlert(message, type = "info") {
    const alertDiv = document.createElement("div")
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`
    alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `

    const container = document.querySelector(".container") || document.body
    container.insertBefore(alertDiv, container.firstChild)

    setTimeout(() => {
      alertDiv.remove()
    }, 5000)
  }
}
