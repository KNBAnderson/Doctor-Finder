import {DoctorList} from './doctor';
import $ from 'jquery';
import './styles.css';


$(document).ready(function(){
  console.log('hello');
  let list = new DoctorList();
  list.populateDoctors();
});