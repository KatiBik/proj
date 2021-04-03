const API_URL = "http://proj.ruppin.ac.il/bgroup21/prod/";

export const authentication = async (email, password) => {
  let returnedObj = null;
  await fetch(API_URL + "api/values/", {
    method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      email: email,
      full_name: "",
      password: password,
      phone: "",
      U_Address: "",
      points: 0,
      credit_number: "",
      credit_validate: "",
      credit_cvv: "",
      latitude: "",
      longitude: "",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `user with id = ${email} not exist`) {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};

export const register_customer = async (user) => {
  let returnedObj = null;
  await fetch(API_URL + "api/user/", {
    method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      email: user.email,
      full_name: user.full_name,
      password: user.password,
      phone: user.phone,
      U_Address: "",
      points: 0,
      credit_number: user.credit_number,
      credit_validate: user.credit_validate,
      credit_cvv: user.credit_cvv,
      latitude: "",
      longitude: "",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (
        data != `user with id = ${user.email} was not created in DB!!!` &&
        data != `user exist in DB!!!`
      ) {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};
export const imageUpload = async (imgUri, picName) => {
  let url;
  let urlAPI = API_URL + "uploadpicture";
  let dataI = new FormData();
  dataI.append("picture", {
    uri: imgUri,
    name: picName + ".jpg",
    type: "image/jpg",
  });
  const config = {
    method: "POST",
    body: dataI,
  };

  await fetch(urlAPI, config)
    .then((res) => {
      console.log("res.status= ", res.status);
      if (res.status == 201) {
        return res.json();
      } else {
        console.log("error uploading with status= ", res.status);
        return "err";
      }
    })
    .then((responseData) => {
      if (responseData != "err") {
        let picNameWOExt = picName.substring(0, picName.indexOf("."));
        let imageNameWithGUID = responseData.substring(
          responseData.indexOf(picNameWOExt),
          responseData.indexOf(".jpg") + 4
        );
        url = API_URL + "uploadFiles/" + imageNameWithGUID;
        console.log("img uploaded successfully!");
      } else {
        console.log("error uploading ...");
        alert("error uploading");
      }
    })
    .catch((err) => {
      alert("err upload= " + err);
    });
  return url;
};
export const getBussiness = async () => {
  let returnedObj = null;
  await fetch(API_URL + "api/Bussiness", {
    method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != "could not get all the bussiness!") {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};
export const register_bussiness = async (bussiness) => {
  let returnedObj = null;
  await fetch(API_URL + "api/bussiness/", {
    method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      Bussiness_Id: bussiness.Bussiness_Id,
      Bussiness_name: bussiness.Bussiness_name,
      summery: bussiness.summery,
      phone: bussiness.phone,
      media: "",
      b_address: bussiness.b_address,
      points: 0,
      photos: bussiness.photos,
      userEmail: bussiness.userEmail,
      credit_number: bussiness.credit_number,
      credit_validate: bussiness.credit_validate,
      credit_cvv: bussiness.credit_cvv,
      latitude: "",
      longitude: "",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (
        data !=
          `bussiness with id = ${bussiness.Bussiness_Id} was not created in DB!!!` &&
        data != `user not exist`
      ) {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};
export const put_bussiness = async (bussiness) => {
  let returnedObj = null;
  await fetch(API_URL + "api/bussiness", {
    method: "PUT", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      Bussiness_Id: bussiness.Bussiness_Id,
      Bussiness_name: bussiness.Bussiness_name,
      summery: bussiness.summery,
      phone: bussiness.phone,
      media: "",
      b_address: bussiness.b_address,
      points: bussiness.points,
      photos: bussiness.photos,
      userEmail: bussiness.userEmail,
      credit_number: bussiness.credit_number,
      credit_validate: bussiness.credit_validate,
      credit_cvv: bussiness.credit_cvv,
      latitude: "",
      longitude: "",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (
        data !=
          `bussiness with id = ${bussiness.Bussiness_Id} exsits but could not be modified!!!` &&
        data !=
          `bussiness with id = ${bussiness.Bussiness_Id} was not found to update!!!`
      ) {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};
export const getTypes = async () => {
  let returnedObj = null;
  await fetch(API_URL + "api/typeOfTreat", {
    method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != "could not get all the typeOfTreat!") {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};

export const getTreatmentByID = async (id) => {
  let returnedObj = null;
  await fetch(API_URL + `api/treatment/${id}`, {
    method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != `Treatment witn id ${id} was not found!!!`) {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};

export const getAppointment = async () => {
  let returnedObj = null;
  await fetch(API_URL + "api/Appointment", {
    method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  }) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      if (data != "could not get all the Appointment!") {
        returnedObj = data;
      } else {
        returnedObj = null;
      }
    })
    .catch(function (err) {
      alert(err);
    });
  return returnedObj;
};
