// Authentication management
class AuthManager {
  static getCurrentUser() {
    return StorageManager.getItem("currentUser")
  }

  static setCurrentUser(user) {
    return StorageManager.setItem("currentUser", user)
  }

  static logout() {
    StorageManager.removeItem("currentUser")
    window.location.href = "/login" // Assuming Router is not declared, using window.location.href as a workaround
  }

  static loginAdmin(email, cpf) {
    const admins = StorageManager.getItem("admins") || []
    const admin = admins.find((a) => a.email === email && a.cpf === cpf)

    if (admin) {
      this.setCurrentUser({ ...admin, type: "admin" })
      return { success: true, user: admin }
    }

    return { success: false, message: "Email ou CPF incorretos" }
  }

  static loginStudent(matricula, cpf) {
    const students = StorageManager.getItem("students") || []
    const student = students.find((s) => s.matricula === matricula && s.cpf === cpf)

    if (student) {
      this.setCurrentUser({ ...student, type: "student" })
      return { success: true, user: student }
    }

    return { success: false, message: "Matrícula ou CPF incorretos" }
  }

  static registerAdmin(nome, email, cpf) {
    const admins = StorageManager.getItem("admins") || []

    // Check if admin already exists
    if (admins.find((a) => a.email === email || a.cpf === cpf)) {
      return { success: false, message: "Admin já cadastrado com este email ou CPF" }
    }

    const newAdmin = {
      id: Date.now(),
      nome,
      email,
      cpf,
    }

    admins.push(newAdmin)
    StorageManager.setItem("admins", admins)

    return { success: true, message: "Admin cadastrado com sucesso" }
  }

  static isAuthenticated() {
    return this.getCurrentUser() !== null
  }

  static isAdmin() {
    const user = this.getCurrentUser()
    return user && user.type === "admin"
  }

  static isStudent() {
    const user = this.getCurrentUser()
    return user && user.type === "student"
  }
}
