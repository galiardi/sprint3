const {
  userForm,
  firstname,
  lastname,
  birthdate,
  isActiveWorker,
  hireDate,
  currentSalary,
  prevSemesterSalary,
  hasFamilyResponsib,
  numOfFamilyResponsib,
  currentSalaryDiv,
  hasFamilyResponsibDiv,
  numOfFamilyResponsibDiv,
  answerA,
  answerB,
  answerC,
} = window;

userForm.addEventListener('submit', onSubmit);
isActiveWorker.addEventListener('change', onIsActiveWorkerChange);
hasFamilyResponsib.addEventListener('change', onHasFamilyResponsibChange);

function onSubmit(e) {
  e.preventDefault();
  const [birthdateYear, birthdateMonth, birthdateDate] =
    birthdate.value.split('-');

  const birthdateObj = new Date(
    parseInt(birthdateYear),
    parseInt(birthdateMonth) - 1,
    parseInt(birthdateDate)
  );

  const [hireYear, hireMonth, hire_date] = hireDate.value.split('-');
  const hireDateObj = new Date(
    parseInt(hireYear),
    parseInt(hireMonth),
    parseInt(hire_date)
  );

  const persona = {
    firstname: firstname.value,
    lastName: lastname.value,
    birthdate: birthdateObj,
    hireDate: hireDateObj,
    isActiveWorker: isActiveWorker.value === 'SI',
    prevSemesterSalary: prevSemesterSalary.value,
    currentSalary: currentSalary.value,
    hasFamilyResponsib: hasFamilyResponsib.value,
    numOfFamilyResponsib: numOfFamilyResponsib.value,
  };

  printPersona(persona);
}

function onIsActiveWorkerChange() {
  if (isActiveWorker.value === 'sSIi') {
    currentSalaryDiv.removeAttribute('hidden');
    hasFamilyResponsibDiv.removeAttribute('hidden');
  } else {
    currentSalaryDiv.setAttribute('hidden', '');
    hasFamilyResponsibDiv.setAttribute('hidden', '');
    hasFamilyResponsib.value = 'NO';
    onHasFamilyResponsibChange();
  }
}

function onHasFamilyResponsibChange() {
  if (hasFamilyResponsib.value === 'si' && isActiveWorker.value === 'SI') {
    numOfFamilyResponsibDiv.removeAttribute('hidden');
  } else {
    numOfFamilyResponsibDiv.setAttribute('hidden', '');
    numOfFamilyResponsib.value = 0;
  }
}

function printPersona(persona) {
  const {
    firstname,
    lastName,
    birthdate,
    hireDate,
    isActiveWorker,
    prevSemesterSalary,
    currentSalary,
    hasFamilyResponsib,
    numOfFamilyResponsib,
  } = persona;

  answerA.innerHTML = `
  <p>Nombre: ${firstname} ${lastName}</p>

  <p>Fecha de nacimiento: ${birthdate.toLocaleDateString()}</p>

  <p>Fecha de ingreso a la organizacion: ${hireDate.toLocaleDateString()}</p>

  <p>${isActiveWorker ? 'Es' : 'No es'} trabajador activo.</p>

  <p>Sueldo del semestre anterior: ${
    prevSemesterSalary || 'no registra salario en el semestre anterior'
  }</p>

  <p>Sueldo actual: ${isActiveWorker ? currentSalary : 'no corresponde'}</p>

  <p>Cargas familiares: ${
    isActiveWorker
      ? hasFamilyResponsib
        ? numOfFamilyResponsib
        : 0
      : 'no corresponde'
  }</p>
  `;
}
