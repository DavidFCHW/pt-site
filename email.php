<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 15/12/2018
 * Time: 13:11
 */

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
    
//require_once("../PHPMailer-master/src/PHPMailer.php");

$mail = new PHPMailer(true);

/*$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure ='tls';
$mail->Host = 'smtp.webmail.co.uk';
$mail->Port = '25';
$mail->isHTML();
$mail->Username = 'contactus@pilgrimtabernacle.co.uk';
$mail->Password = '';
try {
    $mail->SetFrom($_POST['email']);
} catch (Exception $e) {
}
$mail->Subject = 'Enquiries';
$mail->Body = $_POST['message'];
$mail->addAddress('contactus@pilgrimtabernacle.co.uk');

try {
    $mail->send();
} catch (Exception $e) {
}*/

try{
    //Server settings
    $mail->SMTPDebug = 2;
    $mail->isSMTP();
//    $mail->Host = 'smtp.livemail.co.uk';
    $mail->SMTPAuth = false;
    $mail->Username = 'contactus@pilgrimtabernacle.co.uk';
    $mail->Password = '';
//    $mail->SMTPSecure = 'ssl';
//    $mail->Port = '25';
    $mail->Host = 'ssl://smtp.livemail.co.uk:465';
    //Recipients
    $mail->setFrom('contactus@pilgrimtabernacle.co.uk', /*$_POST['name']*/ 'Pilgrim Tabernacle');
    $mail->addAddress('contactus@pilgrimtabernacle.co.uk', 'Pilgrim Tabernacle');

    //Content
    $mail->isHTML(false);
    $mail->Subject = 'Enquiries';
    $mail->Body = $_POST['message'];

    $mail->send();
    echo 'message has been sent';
} catch(\Exception $e){
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

//$message = $_POST['message'];
/*mail("contactus@pilgrimtabernacle.co.uk", "Test Subject", $_POST['message']);
mail("contactus@pilgrimtabernacle.co.uk", "Test Subject", "This is a message", null, null);*/
?>