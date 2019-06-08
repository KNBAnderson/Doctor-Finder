import {DoctorList} from './doctor';
import $ from 'jquery';
import './styles.css';


$(document).ready(function(){
  $('form').submit(e => {
    let list = new DoctorList();
    $('#results').text('');
    e.preventDefault();
    let searchArr =[];
    if ($('#name').val()) {
      let name = '&name='+$('#name').val();
      searchArr.push(name);
    }
    if ($('#symptom').val()) {
      let symptom = '&query='+$('#symptom').val();
      searchArr.push(symptom);
    }
    list.getUrl(searchArr);

    let promise = new Promise(function(resolve, reject) {
      list.populateDoctors();
    });
    //I know this isn't the best way to do this
    setTimeout(() => {
      if (list.allDoctors.length != 0) {
        list.allDoctors.forEach(doctor => {
          console.log("here", doctor)
          $('#results').append(`<li class="doctorInfo">${doctor.firstName} ${doctor.lastName}</li><ul class="hidden">
          <li>${doctor.phoneNumber}</li>
          <li>${doctor.address}</li>
          <li>${doctor.bio}</li>
        </ul>`);
        });
      } else {
        $('#results').html(`<p>No doctors meet your criteria</p>`);
      }
    }, 2000)
  });
   //Why wont this work :(
  $(".doctorInfo").on('click', function () {
    console.log("got it")
    $(this).find('ul.hidden').toggle();
  })
});

