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
    isActiveWorker: isActiveWorker.value,
    hireDate: hireDateObj,
    currentSalary: currentSalary.value,
    prevSemesterSalary: prevSemesterSalary.value,
    hasFamilyResponsib: hasFamilyResponsib.value,
    numOfFamilyResponsib: numOfFamilyResponsib.value,
  };
  console.log(persona);
}

function onIsActiveWorkerChange() {
  if (isActiveWorker.value === 'si') {
    currentSalaryDiv.removeAttribute('hidden');
    hasFamilyResponsibDiv.removeAttribute('hidden');
  } else {
    currentSalaryDiv.setAttribute('hidden', '');
    hasFamilyResponsibDiv.setAttribute('hidden', '');
    hasFamilyResponsib.value = 'no';
    onHasFamilyResponsibChange();
  }
}

function onHasFamilyResponsibChange() {
  hasFamilyResponsib.value === 'si' && isActiveWorker.value === 'si'
    ? numOfFamilyResponsibDiv.removeAttribute('hidden')
    : numOfFamilyResponsibDiv.setAttribute('hidden', '');
}
