<?php

$data = json_decode('[{"ID":11,"FIRST_NAME":"Rob","LAST_NAME":"Vogel","TITLE":"Programmer","PHONE":"1234567890","EMAIL":"rvogel@mc3.edu","theme":"OrangeRed"}]');

echo $data[0]->ID;
