<?php

$user = json_decode(file_get_contents('php://input'));

$namePeople = $user->nameUserContact;
$buildPeople = $user->buildUserContact;
$mailPeople = $user->mailUserContact;
$phonePeople = $user->telUserContact;
$msgPeople = $user->bodyMsgContact;

$to = "claudia.ramirez@inacom.com.mx, sandro.castillo@inacom.com.mx, ";
$subject = "Formulario de sitio - Red Hat";
$txt = "Correo de: ".$namePeople."\n"."Empresa: ".$buildPeople."\n"."Teléfono: ".$phonePeople."\n"."Descripción del mensaje: ".$msgPeople;
$headers = "From: ".$mailPeople;

mail($to,$subject,$txt,$headers);

?> 