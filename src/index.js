import {DoctorList} from './doctor';
import $ from 'jquery';
import './styles.css';


$(document).ready(function(){
  $('form').submit(e => {
    let list = new DoctorList();
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
        console.log("here", doctor)
        $('#results').append(`<li>${doctor.firstName} ${doctor.lastName}</li>`);
      });
    }, 2000)
  }); 
});