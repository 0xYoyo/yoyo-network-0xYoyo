const handleMultiPartForm = async (form) => {
  const url = form.action;
  let formMethod;
  if (form.method == "get") {
    formMethod = "put";
  } else {
    formMethod = form.method;
  }
  const formData = new FormData(form);
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
  return responseObj;
};

export { handleMultiPartForm };
