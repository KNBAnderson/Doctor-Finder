import {greeting} from './functions';
import $ from 'jquery';
import './styles.css';

$(document).ready(function(){
  $('#jsOutput').text(greeting());
});