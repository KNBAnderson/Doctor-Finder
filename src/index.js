import {DoctorList} from './doctor';
import $ from 'jquery';
import './styles.css';


$(document).ready(function(){
  let list = new DoctorList();
  $('form').submit(e => {
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

    setTimeout(() => {
      list.allDoctors.forEach(doctor => {
        $('#results').append(`<li>${doctor.firstName} ${doctor.lastName}</li>`);
      });
    }, 2000)
  }); 
});