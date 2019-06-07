export class Doctor{
  constructor(firstName, lastName, imageUrl, address, phoneNumber, newPatientBool, bio, specialty) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.newPatientBool = newPatientBool;
    this.bio = bio;
    this.imageUrl = imageUrl;
    this.specialty = specialty;
  }
}

export class DoctorList {
  constructor() {
    this.allDoctors = [];
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
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  populateDoctors() {
    this.getDoctors()
    .then(response => {
      let doctorsResponse = JSON.parse(response);
      console.log("stuff", doctorsResponse)
      doctorsResponse.data.forEach(doctor => {
        let entry = new Doctor(doctor.profile.first_name, doctor.profile.last_name, doctor.profile.image_url, doctor.practices[0].visit_address.street, doctor.practices[0].phones[0].number, doctor.practices[0].accepts_new_patients, doctor.profile.bio, doctor.specialties);
        console.log(entry);
        this.allDoctors.push(doctor);
      })
    })
  }
}