<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 15/12/2018
 * Time: 13:11
 */


$name = "";
$email = "";
$mobile = "";

$nameErr = "";
$emailErr = "";
$mobileErr = "";
$messageErr = "";

//for the email.
//TODO: what kind of enquiries.

$to = "contactus@pilgrimtabernacle.co.uk";
$subject = "Enquiries";
$message = $_POST['message'];
$headers = 'From: ' . $to . '\r\n' . 'Reply-To: ' . $_POST['email'];


//Removing any possible XSS characters.

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!empty($_POST['name'])){
        $name = charFilter($_POST['name']);
    }

    if(!empty($_POST['email'])){
        $email = charFilter($_POST['email']);
    }

    if(!empty($_POST['mobile'])){
        $mobile = charFilter($_POST['mobile']);
    }

    if(!empty($_POST['message'])){
        $message = charFilter($_POST['message']);
    }

    ini_set('SMTP', '213.171.216.40');
    mail($to, $subject, $message, "From: contactus@pilgrimtabernacle.co.uk");

}

function charFilter($input){
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}

