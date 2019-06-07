export class Doctor{
  constructor(firstName, lastName, address, phoneNumber, website, newPatientBool) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.website = website;
    this.newPatientBool = newPatientBool;
  }
}

export class DoctorList {
  constructor() {
    this.allDoctors = [];
  }
  getAllDoctors() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=name&location=or-portland&sort=full-name-asc&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  populateDoctors() {
    this.getAllDoctors()
    .then(response => {
      let doctorsResponse = JSON.parse(response);
      doctorsResponse.forEach(doctor => {
        console.log(doctor);
        this.allDoctors.push(doctor);
      })
    })
  }
}