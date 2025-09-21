// UI Components
class Components {
  static renderLogin() {
    return `
            <div class="login-container">
                <div class="login-card">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <h2 class="card-title">Sistema Escolar</h2>
                                <p class="text-muted">Login de Administrador</p>
                            </div>
                            
                            <form id="adminLoginForm">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="cpf" class="form-label">CPF</label>
                                    <input type="text" class="form-control" id="cpf" required maxlength="11">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mb-3">Entrar</button>
                            </form>
                            
                            <div class="text-center">
                                <p class="mb-2">
                                    <a href="#" data-route="/cadastro" class="text-decoration-none">Cadastrar novo admin</a>
                                </p>
                                <p class="mb-0">
                                    <a href="#" data-route="/loginAluno" class="text-decoration-none">Login de Aluno</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static renderAdminRegister() {
    return `
            <div class="login-container">
                <div class="login-card">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <h2 class="card-title">Cadastro de Admin</h2>
                                <p class="text-muted">Criar nova conta de administrador</p>
                            </div>
                            
                            <form id="adminRegisterForm">
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome Completo</label>
                                    <input type="text" class="form-control" id="nome" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="cpf" class="form-label">CPF</label>
                                    <input type="text" class="form-control" id="cpf" required maxlength="11">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mb-3">Cadastrar</button>
                            </form>
                            
                            <div class="text-center">
                                <a href="#" data-route="/login" class="text-decoration-none">Voltar ao login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static renderStudentLogin() {
    return `
            <div class="login-container">
                <div class="login-card">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <h2 class="card-title">Sistema Escolar</h2>
                                <p class="text-muted">Login de Aluno</p>
                            </div>
                            
                            <form id="studentLoginForm">
                                <div class="mb-3">
                                    <label for="matricula" class="form-label">Número de Matrícula</label>
                                    <input type="text" class="form-control" id="matricula" required>
                                </div>
                                <div class="mb-3">
                                    <label for="cpf" class="form-label">CPF</label>
                                    <input type="text" class="form-control" id="cpf" required maxlength="11">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mb-3">Entrar</button>
                            </form>
                            
                            <div class="text-center">
                                <a href="#" data-route="/login" class="text-decoration-none">Login de Administrador</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static renderAdminHome() {
    const AuthManager = window.AuthManager // Declare AuthManager
    const Router = window.Router // Declare Router
    if (!AuthManager.isAdmin()) {
      Router.navigate("/login")
      return ""
    }

    const students = StorageManager.getStudents()
    const classes = StorageManager.getClasses()
    const courses = StorageManager.getCourses()
    const currentUser = AuthManager.getCurrentUser()

    return `
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div class="container">
                    <span class="navbar-brand">Sistema Escolar - Admin</span>
                    <div class="navbar-nav ms-auto">
                        <span class="nav-text me-3">Olá, ${currentUser.nome}</span>
                        <button class="btn btn-outline-secondary btn-sm logout-btn">Sair</button>
                    </div>
                </div>
            </nav>

            <div class="container mt-4">
                <div class="row mb-4">
                    <div class="col-md-12">
                        <div class="d-flex justify-content-between align-items-center">
                            <h1>Painel Administrativo</h1>
                            <a href="#" data-route="/cadastro-entidades" class="btn btn-primary">
                                Cadastrar Aluno/Turma/Curso
                            </a>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total de Alunos</h5>
                                <h2 class="text-primary">${students.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total de Turmas</h5>
                                <h2 class="text-success">${classes.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5 class="card-title">Total de Cursos</h5>
                                <h2 class="text-warning">${courses.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced filter and search controls for students -->
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-md-4">
                                <h5 class="mb-0">Alunos Cadastrados</h5>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-4">
                                        <input type="text" class="form-control form-control-sm" id="searchStudent" 
                                               placeholder="Buscar por nome ou matrícula...">
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-select form-select-sm" id="filterTurma">
                                            <option value="">Todas as turmas</option>
                                            ${classes.map((c) => `<option value="${c.id}">${c.nome}</option>`).join("")}
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-select form-select-sm" id="filterCurso">
                                            <option value="">Todos os cursos</option>
                                            ${courses.map((c) => `<option value="${c.id}">${c.nome}</option>`).join("")}
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <button class="btn btn-outline-secondary btn-sm w-100" id="clearFilters">
                                            Limpar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="studentsTableContainer">
                            ${this.renderStudentsTable(students, classes, courses)}
                        </div>
                        <div id="noResultsMessage" class="text-center text-muted" style="display: none;">
                            <p>Nenhum aluno encontrado com os filtros aplicados.</p>
                        </div>
                    </div>
                </div>

                <!-- Enhanced management sections for classes and courses with search -->
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <h5 class="mb-0">Turmas Cadastradas</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control form-control-sm" id="searchClass" 
                                               placeholder="Buscar turma...">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="classesTableContainer">
                                    ${this.renderClassesTable(classes)}
                                </div>
                                <div id="noClassesMessage" class="text-center text-muted" style="display: none;">
                                    <p>Nenhuma turma encontrada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <h5 class="mb-0">Cursos Cadastrados</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control form-control-sm" id="searchCourse" 
                                               placeholder="Buscar curso...">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="coursesTableContainer">
                                    ${this.renderCoursesTable(courses)}
                                </div>
                                <div id="noCoursesMessage" class="text-center text-muted" style="display: none;">
                                    <p>Nenhum curso encontrado.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Added modal for editing students -->
            <div class="modal fade" id="editStudentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar Aluno</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editStudentForm">
                                <input type="hidden" id="editStudentId">
                                <div class="mb-3">
                                    <label class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="editStudentNome" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Idade</label>
                                    <input type="number" class="form-control" id="editStudentIdade" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">CPF</label>
                                    <input type="text" class="form-control" id="editStudentCpf" required maxlength="11">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Turma</label>
                                    <select class="form-control" id="editStudentTurma">
                                        <option value="">Selecione uma turma</option>
                                        ${classes.map((c) => `<option value="${c.id}">${c.nome}</option>`).join("")}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Curso</label>
                                    <select class="form-control" id="editStudentCurso">
                                        <option value="">Selecione um curso</option>
                                        ${courses.map((c) => `<option value="${c.id}">${c.nome}</option>`).join("")}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="saveStudentEdit()">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static renderStudentsTable(students, classes, courses) {
    if (students.length === 0) {
      return '<p class="text-muted text-center">Nenhum aluno cadastrado ainda.</p>'
    }

    return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                <a href="#" class="text-decoration-none text-dark" onclick="sortStudents('matricula')">
                                    Matrícula <i class="bi bi-arrow-up-down"></i>
                                </a>
                            </th>
                            <th>
                                <a href="#" class="text-decoration-none text-dark" onclick="sortStudents('nome')">
                                    Nome <i class="bi bi-arrow-up-down"></i>
                                </a>
                            </th>
                            <th>
                                <a href="#" class="text-decoration-none text-dark" onclick="sortStudents('idade')">
                                    Idade <i class="bi bi-arrow-up-down"></i>
                                </a>
                            </th>
                            <th>CPF</th>
                            <th>Turma</th>
                            <th>Curso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students
                          .map((student) => {
                            const studentClass = classes.find((c) => c.id === student.turmaId)
                            const studentCourse = courses.find((c) => c.id === student.cursoId)

                            return `
                                <tr data-turma-id="${student.turmaId || ""}" 
                                    data-curso-id="${student.cursoId || ""}"
                                    data-student-name="${student.nome.toLowerCase()}"
                                    data-student-matricula="${student.matricula.toLowerCase()}">
                                    <td><span class="badge bg-primary">${student.matricula}</span></td>
                                    <td><strong>${student.nome}</strong></td>
                                    <td>${student.idade} anos</td>
                                    <td>${this.formatCPF(student.cpf)}</td>
                                    <td>${studentClass ? `<span class="badge bg-success">${studentClass.nome}</span>` : '<span class="text-muted">N/A</span>'}</td>
                                    <td>${studentCourse ? `<span class="badge bg-warning text-dark">${studentCourse.nome}</span>` : '<span class="text-muted">N/A</span>'}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editStudent(${student.id})">
                                            Editar
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${student.id})">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            `
                          })
                          .join("")}
                    </tbody>
                </table>
            </div>
        `
  }

  static renderClassesTable(classes) {
    if (classes.length === 0) {
      return '<p class="text-muted text-center">Nenhuma turma cadastrada ainda.</p>'
    }

    return `
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ano</th>
                            <th>Turno</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${classes
                          .map(
                            (classItem) => `
                            <tr data-class-name="${classItem.nome.toLowerCase()}" 
                                data-class-turno="${classItem.turno.toLowerCase()}">
                                <td><strong>${classItem.nome}</strong></td>
                                <td>${classItem.ano}</td>
                                <td><span class="badge bg-info">${classItem.turno}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-danger" onclick="deleteClass(${classItem.id})">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        `
  }

  static renderCoursesTable(courses) {
    if (courses.length === 0) {
      return '<p class="text-muted text-center">Nenhum curso cadastrado ainda.</p>'
    }

    return `
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Área</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${courses
                          .map(
                            (course) => `
                            <tr data-course-name="${course.nome.toLowerCase()}" 
                                data-course-area="${(course.area || "").toLowerCase()}">
                                <td><strong>${course.nome}</strong></td>
                                <td>
                                    ${course.area ? `<span class="badge bg-secondary">${course.area}</span>` : '<span class="text-muted">N/A</span>'}
                                </td>
                                <td class="text-truncate" style="max-width: 200px;" title="${course.descricao}">
                                    ${course.descricao}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${course.id})">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        `
  }

  static renderStudentHome() {
    const AuthManager = window.AuthManager // Declare AuthManager
    const Router = window.Router // Declare Router
    if (!AuthManager.isStudent()) {
      Router.navigate("/loginAluno")
      return ""
    }

    const currentUser = AuthManager.getCurrentUser()
    const classes = StorageManager.getClasses()
    const courses = StorageManager.getCourses()

    const studentClass = classes.find((c) => c.id === currentUser.turmaId)
    const studentCourse = courses.find((c) => c.id === currentUser.cursoId)

    return `
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div class="container">
                    <span class="navbar-brand">Sistema Escolar - Portal do Aluno</span>
                    <div class="navbar-nav ms-auto">
                        <span class="nav-text me-3">Olá, ${currentUser.nome}</span>
                        <button class="btn btn-outline-secondary btn-sm logout-btn">Sair</button>
                    </div>
                </div>
            </nav>

            <div class="container mt-4">
                <!-- Enhanced student dashboard with more information -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="alert alert-info">
                            <h5 class="alert-heading">Bem-vindo ao Portal do Aluno!</h5>
                            <p class="mb-0">Aqui você pode visualizar suas informações acadêmicas e dados pessoais.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Personal Information Card -->
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header bg-primary text-white">
                                <h5 class="mb-0">
                                    <i class="bi bi-person-circle"></i> Dados Pessoais
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p><strong>Nome:</strong></p>
                                        <p class="text-muted">${currentUser.nome}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p><strong>Matrícula:</strong></p>
                                        <p class="text-muted">
                                            <span class="badge bg-primary">${currentUser.matricula}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p><strong>Idade:</strong></p>
                                        <p class="text-muted">${currentUser.idade} anos</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p><strong>CPF:</strong></p>
                                        <p class="text-muted">${this.formatCPF(currentUser.cpf)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Academic Information Card -->
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header bg-success text-white">
                                <h5 class="mb-0">
                                    <i class="bi bi-mortarboard"></i> Informações Acadêmicas
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p><strong>Turma:</strong></p>
                                        <p class="text-muted">
                                            ${
                                              studentClass
                                                ? `<span class="badge bg-success">${studentClass.nome}</span>`
                                                : '<span class="text-warning">Não definida</span>'
                                            }
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p><strong>Turno:</strong></p>
                                        <p class="text-muted">
                                            ${
                                              studentClass
                                                ? `<span class="badge bg-info">${studentClass.turno}</span>`
                                                : '<span class="text-muted">N/A</span>'
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p><strong>Curso:</strong></p>
                                        <p class="text-muted">
                                            ${
                                              studentCourse
                                                ? `<span class="badge bg-warning text-dark">${studentCourse.nome}</span>`
                                                : '<span class="text-warning">Não definido</span>'
                                            }
                                        </p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p><strong>Ano Letivo:</strong></p>
                                        <p class="text-muted">
                                            ${studentClass ? studentClass.ano : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Course Details Card (if enrolled) -->
                ${
                  studentCourse
                    ? `
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-warning text-dark">
                                    <h5 class="mb-0">
                                        <i class="bi bi-book"></i> Detalhes do Curso: ${studentCourse.nome}
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <h6>Descrição do Curso:</h6>
                                            <p class="text-muted">${studentCourse.descricao}</p>
                                        </div>
                                        <div class="col-md-4">
                                            ${
                                              studentCourse.area
                                                ? `
                                                <p><strong>Área:</strong></p>
                                                <p class="text-muted">${studentCourse.area}</p>
                                            `
                                                : ""
                                            }
                                            ${
                                              studentCourse.duracao
                                                ? `
                                                <p><strong>Duração:</strong></p>
                                                <p class="text-muted">${studentCourse.duracao} semestres</p>
                                            `
                                                : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    : `
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="alert alert-warning">
                                <h5 class="alert-heading">Curso não definido</h5>
                                <p class="mb-0">Você ainda não foi matriculado em nenhum curso. Entre em contato com a secretaria para mais informações.</p>
                            </div>
                        </div>
                    </div>
                `
                }

                <!-- Class Details Card (if enrolled) -->
                ${
                  studentClass
                    ? `
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h5 class="mb-0">
                                        <i class="bi bi-collection"></i> Detalhes da Turma: ${studentClass.nome}
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <p><strong>Turno:</strong></p>
                                            <p class="text-muted">${studentClass.turno}</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p><strong>Ano Letivo:</strong></p>
                                            <p class="text-muted">${studentClass.ano}</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p><strong>Capacidade:</strong></p>
                                            <p class="text-muted">${studentClass.capacidade || 30} alunos</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p><strong>Status:</strong></p>
                                            <p class="text-muted">
                                                <span class="badge bg-success">Ativa</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    : `
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="alert alert-warning">
                                <h5 class="alert-heading">Turma não definida</h5>
                                <p class="mb-0">Você ainda não foi alocado em nenhuma turma. Entre em contato com a secretaria para mais informações.</p>
                            </div>
                        </div>
                    </div>
                `
                }

                <!-- Academic Status Summary -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-secondary text-white">
                                <h5 class="mb-0">
                                    <i class="bi bi-clipboard-check"></i> Status Acadêmico
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row text-center">
                                    <div class="col-md-4">
                                        <div class="border rounded p-3 mb-3">
                                            <h4 class="${studentCourse ? "text-success" : "text-warning"}">
                                                ${studentCourse ? "✓" : "⚠"}
                                            </h4>
                                            <p class="mb-0">
                                                <strong>Curso</strong><br>
                                                <small class="text-muted">
                                                    ${studentCourse ? "Matriculado" : "Pendente"}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="border rounded p-3 mb-3">
                                            <h4 class="${studentClass ? "text-success" : "text-warning"}">
                                                ${studentClass ? "✓" : "⚠"}
                                            </h4>
                                            <p class="mb-0">
                                                <strong>Turma</strong><br>
                                                <small class="text-muted">
                                                    ${studentClass ? "Alocado" : "Pendente"}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="border rounded p-3 mb-3">
                                            <h4 class="text-success">✓</h4>
                                            <p class="mb-0">
                                                <strong>Matrícula</strong><br>
                                                <small class="text-muted">Ativa</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                ${
                                  !studentCourse || !studentClass
                                    ? `
                                    <div class="alert alert-info mt-3">
                                        <p class="mb-0">
                                            <strong>Atenção:</strong> Para completar sua matrícula, entre em contato com a secretaria acadêmica.
                                        </p>
                                    </div>
                                `
                                    : `
                                    <div class="alert alert-success mt-3">
                                        <p class="mb-0">
                                            <strong>Parabéns!</strong> Sua matrícula está completa e você pode iniciar suas atividades acadêmicas.
                                        </p>
                                    </div>
                                `
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static renderEntityRegistration() {
    const AuthManager = window.AuthManager // Declare AuthManager
    const Router = window.Router // Declare Router
    if (!AuthManager.isAdmin()) {
      Router.navigate("/login")
      return ""
    }

    const currentUser = AuthManager.getCurrentUser()
    const classes = StorageManager.getClasses()
    const courses = StorageManager.getCourses()

    return `
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div class="container">
                    <span class="navbar-brand">Sistema Escolar - Cadastros</span>
                    <div class="navbar-nav ms-auto">
                        <a href="#" data-route="/home" class="btn btn-outline-secondary btn-sm me-2">Voltar</a>
                        <button class="btn btn-outline-secondary btn-sm logout-btn">Sair</button>
                    </div>
                </div>
            </nav>

            <div class="container mt-4">
                <!-- Enhanced registration forms with better validation and styling -->
                <div class="row">
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header bg-primary text-white">
                                <h5 class="mb-0">
                                    <i class="bi bi-person-plus"></i> Cadastrar Aluno
                                </h5>
                            </div>
                            <div class="card-body">
                                <form id="studentForm">
                                    <div class="mb-3">
                                        <label class="form-label">Nome Completo *</label>
                                        <input type="text" class="form-control" id="studentNome" required 
                                               placeholder="Digite o nome completo">
                                        <div class="invalid-feedback">
                                            Por favor, digite o nome do aluno.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Idade *</label>
                                        <input type="number" class="form-control" id="studentIdade" required 
                                               min="5" max="100" placeholder="Ex: 18">
                                        <div class="invalid-feedback">
                                            Digite uma idade válida (5-100 anos).
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">CPF *</label>
                                        <input type="text" class="form-control" id="studentCpf" required 
                                               maxlength="11" placeholder="Apenas números">
                                        <div class="form-text">Digite apenas os números do CPF.</div>
                                        <div class="invalid-feedback">
                                            CPF deve ter 11 dígitos.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Turma</label>
                                        <select class="form-select" id="studentTurma">
                                            <option value="">Selecione uma turma</option>
                                            ${classes.map((c) => `<option value="${c.id}">${c.nome} - ${c.turno}</option>`).join("")}
                                        </select>
                                        <div class="form-text">Opcional - pode ser definida depois.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Curso</label>
                                        <select class="form-select" id="studentCurso">
                                            <option value="">Selecione um curso</option>
                                            ${courses.map((c) => `<option value="${c.id}">${c.nome}</option>`).join("")}
                                        </select>
                                        <div class="form-text">Opcional - pode ser definida depois.</div>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-check-circle"></i> Cadastrar Aluno
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header bg-success text-white">
                                <h5 class="mb-0">
                                    <i class="bi bi-collection"></i> Cadastrar Turma
                                </h5>
                            </div>
                            <div class="card-body">
                                <form id="classForm">
                                    <div class="mb-3">
                                        <label class="form-label">Nome da Turma *</label>
                                        <input type="text" class="form-control" id="className" required 
                                               placeholder="Ex: 3º Ano A">
                                        <div class="invalid-feedback">
                                            Por favor, digite o nome da turma.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Ano Letivo *</label>
                                        <input type="number" class="form-control" id="classYear" required 
                                               min="2020" max="2030" placeholder="Ex: 2024">
                                        <div class="invalid-feedback">
                                            Digite um ano válido.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Turno *</label>
                                        <select class="form-select" id="classTurno" required>
                                            <option value="">Selecione o turno</option>
                                            <option value="Manhã">Manhã (07:00 - 12:00)</option>
                                            <option value="Tarde">Tarde (13:00 - 18:00)</option>
                                            <option value="Noite">Noite (19:00 - 23:00)</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Selecione um turno.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Capacidade de Alunos</label>
                                        <input type="number" class="form-control" id="classCapacity" 
                                               min="10" max="50" placeholder="Ex: 30" value="30">
                                        <div class="form-text">Número máximo de alunos na turma.</div>
                                    </div>
                                    <button type="submit" class="btn btn-success w-100">
                                        <i class="bi bi-check-circle"></i> Cadastrar Turma
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header bg-warning text-dark">
                                <h5 class="mb-0">
                                    <i class="bi bi-book"></i> Cadastrar Curso
                                </h5>
                            </div>
                            <div class="card-body">
                                <form id="courseForm">
                                    <div class="mb-3">
                                        <label class="form-label">Nome do Curso *</label>
                                        <input type="text" class="form-control" id="courseName" required 
                                               placeholder="Ex: Administração">
                                        <div class="invalid-feedback">
                                            Por favor, digite o nome do curso.
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Área do Conhecimento</label>
                                        <select class="form-select" id="courseArea">
                                            <option value="">Selecione a área</option>
                                            <option value="Exatas">Ciências Exatas</option>
                                            <option value="Humanas">Ciências Humanas</option>
                                            <option value="Biológicas">Ciências Biológicas</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                            <option value="Artes">Artes e Design</option>
                                            <option value="Saúde">Saúde</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Duração (em semestres)</label>
                                        <input type="number" class="form-control" id="courseDuration" 
                                               min="2" max="12" placeholder="Ex: 8">
                                        <div class="form-text">Duração total do curso.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Descrição *</label>
                                        <textarea class="form-control" id="courseDescription" rows="4" required 
                                                  placeholder="Descreva o curso, objetivos e competências..."></textarea>
                                        <div class="invalid-feedback">
                                            Por favor, adicione uma descrição do curso.
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-warning w-100">
                                        <i class="bi bi-check-circle"></i> Cadastrar Curso
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Added summary section showing current registrations -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Resumo dos Cadastros</h5>
                            </div>
                            <div class="card-body">
                                <div class="row text-center">
                                    <div class="col-md-4">
                                        <div class="border rounded p-3">
                                            <h3 class="text-primary">${StorageManager.getStudents().length}</h3>
                                            <p class="mb-0">Alunos Cadastrados</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="border rounded p-3">
                                            <h3 class="text-success">${StorageManager.getClasses().length}</h3>
                                            <p class="mb-0">Turmas Ativas</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="border rounded p-3">
                                            <h3 class="text-warning">${StorageManager.getCourses().length}</h3>
                                            <p class="mb-0">Cursos Disponíveis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  static formatCPF(cpf) {
    if (!cpf || cpf.length !== 11) return cpf
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }
}
