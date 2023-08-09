const handleMultiPartForm = async (form) => {
  const url = form.action;
  const formMethod = form.method;
  const formData = new FormData(form);
  console.log(formMethod);
  const fetchOptions = {
    method: formMethod,
    body: formData,
  };
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorMessage = await response.text();
    const errorObj = JSON.parse(errorMessage);
    console.log(errorObj.msg);
    throw new Error(`${errorObj.msg}`);
  }
  const responseObj = await response.json();
  console.log(responseObj);
};

export { handleMultiPartForm };
