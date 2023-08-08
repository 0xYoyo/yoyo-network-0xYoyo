import { setLocalStorage } from "./authService";

const handleAuthForm = async (form) => {
  const url = form.action;
  const formData = new FormData(form);
  const responseData = await postFormDataAsJson({ url, formData });
  console.log({ responseData });
  setLocalStorage(responseData);
  form.reset();
};

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    const errorObj = JSON.parse(errorMessage);
    console.log(errorObj.msg);
    throw new Error(`${errorObj.msg}`);
  }
  return response.json();
}

export { handleAuthForm, postFormDataAsJson };
