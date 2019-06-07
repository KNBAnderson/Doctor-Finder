export class Doctor{
  constructor() {
    this.firstName;
    this.lastName;
    this.address;
    this.phoneNumber;
    this.newPatientBool;
    this.bio;
    this.imageUrl;
    this.specialties = [];
  }
}

export class DoctorList {
  constructor() {
    this.allDoctors = [];
  }

  getUrl(queryParameters) {
    let url = "https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&sort=full-name-asc";
    for (let i = 0; i < queryParameters.length; i++) {
      url += queryParameters[i];
    }
    this.apiUrl = url + "&user_key=" + process.env.exports.apiKey;
  }

  getDoctors() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&sort=full-name-asc&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  populateDoctors() {
    this.getDoctors()
    .then(response => {
      let doctorsResponse = JSON.parse(response);
      doctorsResponse.data.forEach(doctor => {
        let entry = new Doctor();
        entry.firstName = doctor.profile.first_name;
        entry.lastName = doctor.profile.last_name;
        entry.imageUrl = doctor.profile.image_url;
        doctor.practices.forEach(address => {
          if (address.visit_address.city === "Portland") {
            entry.address = (address.visit_address.name + '\n' + address.visit_address.street + '\nPortland, OR \n' + address.visit_address.zip);
            entry.newPatientBool = address.accepts_new_patients;
            entry.phoneNumber = address.phones[0].number;
          }
        });
        entry.bio = doctor.profile.bio;
        doctor.specialties.forEach(specialty => {
          entry.specialties.push(specialty.name);
        });
        console.log(entry);
        this.allDoctors.push(entry);
      });
    });
  }
}