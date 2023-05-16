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
    parseInt(hireMonth) - 1,
    parseInt(hire_date)
  );

  const persona = {
    firstname: firstname.value,
    lastname: lastname.value,
    birthdate: birthdateObj,
    hireDate: hireDateObj,
    isActiveWorker: isActiveWorker.value === 'SI',
    prevSemesterSalary: prevSemesterSalary.value,
    currentSalary: currentSalary.value,
    hasFamilyResponsib: hasFamilyResponsib.value,
    numOfFamilyResponsib: numOfFamilyResponsib.value,
  };

  printPersona(persona);
  printTenure(persona);
}

// Si es trabajador activo, muestra currentSalaryDiv y hasFamilyResponsibDiv
// caso contrario los esconde y reestablece el valor del input hasFamilyResponsib a su valor por defecto ('no')
function onIsActiveWorkerChange() {
  if (isActiveWorker.value === 'SI') {
    currentSalaryDiv.removeAttribute('hidden');
    hasFamilyResponsibDiv.removeAttribute('hidden');
  } else {
    currentSalaryDiv.setAttribute('hidden', '');
    hasFamilyResponsibDiv.setAttribute('hidden', '');
    hasFamilyResponsib.value = 'NO';
    onHasFamilyResponsibChange();
  }
}

// Si tiene cargas familiares, muestra el input numOfFamilyResponsib
// caso contrario lo esconde y restablece su valor por defecto
function onHasFamilyResponsibChange() {
  if (hasFamilyResponsib.value === 'SI' && isActiveWorker.value === 'SI') {
    numOfFamilyResponsibDiv.removeAttribute('hidden');
  } else {
    numOfFamilyResponsibDiv.setAttribute('hidden', '');
    numOfFamilyResponsib.value = '';
  }
}

function printPersona(persona) {
  const {
    firstname,
    lastname,
    birthdate,
    hireDate,
    isActiveWorker,
    prevSemesterSalary,
    currentSalary,
    hasFamilyResponsib,
    numOfFamilyResponsib,
  } = persona;

  answerA.innerHTML = `
  <p>Nombre: ${firstname} ${lastname}</p>

  <p>Fecha de nacimiento: ${birthdate.toLocaleDateString()}</p>

  <p>Fecha de ingreso a la organizacion: ${hireDate.toLocaleDateString()}</p>

  <p>${isActiveWorker ? 'Es' : 'No es'} trabajador activo.</p>

  <p>Sueldo del semestre anterior: ${
    prevSemesterSalary || 'no registra salario en el semestre anterior'
  }</p>

  <p>Sueldo actual: ${isActiveWorker ? currentSalary : 'no corresponde'}</p>

  <p>Cargas familiares: ${
    isActiveWorker
      ? hasFamilyResponsib === 'SI'
        ? numOfFamilyResponsib
        : 0
      : 'no corresponde'
  }</p>
  `;
}

function printTenure(persona) {
  const { firstname, lastname } = persona;
  const { tenureDays, tenureMonths, tenureYears } = getTenure(persona);
  answerB.innerHTML = `
    <p>La permanencia de ${firstname} ${lastname} en la empresa es de ${tenureYears} anos, ${tenureMonths} ${
    tenureMonths === 1 ? 'mes' : 'meses'
  } y ${tenureDays} ${tenureDays === 1 ? 'dia' : 'dias'}</p>
    `;
}

function getTenure(persona) {
  const { hireDate } = persona;
  const todayDate = new Date();
  const tenureYears = todayDate.getFullYear() - hireDate.getFullYear();
  const tenureMonths = todayDate.getMonth() - hireDate.getMonth();
  const tenureDays = todayDate.getDate() - hireDate.getDate();

  if (tenureDays < 0) {
    tenureMonths -= 1;

    // si el ano pasado fue bisiesto wasLeapYear es true
    // Me interesa el ano pasado, no este ano, porque este dato me sera util por ejemplo si ingreso el 20-02-2022 y estamos a 15-02-2023. Si el ano pasado fue bisiesto tendre un dia mas trabajado, si este ano es bisiesto no importa porque aun no ha llegado.
    const wasLeapYear = (todayDate.getFullYear() - 1) % 4 === 0;
    const daysByMonths = [
      31,
      wasLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    tenureDays = daysByMonths[todayDate.getMonth()] + tenureDays; // tenureDays es negativo
  }

  if (tenureMonths < 0) {
    tenureYears -= 1;
    tenureMonths = 12 + tenureMonths; // tenureMonths es negativo
  }

  return {
    tenureDays,
    tenureMonths,
    tenureYears,
  };
}
