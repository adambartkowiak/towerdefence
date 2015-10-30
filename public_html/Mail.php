<?php
/**
 * Created by PhpStorm.
 * User: adambartkowiak
 * Date: 28/10/15
 * Time: 17:58
 */


//set correct content-type-header
//header('Content-type: text/calendar; charset=utf-8');
//header('Content-Disposition: inline; filename=calendar.ics');
//echo $ical;


if(isset($_POST['submit'])){

$ical = "BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:20151030T110000Z
DTEND:20151030T163000Z
DTSTAMP:20151029T090613Z
ORGANIZER;CN=Adam Bartkowiak:mailto:adambartkowiak2000@gmail.com
UID:".md5(uniqid(mt_rand(), true))."@google.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=p.pawlak@funandmobile.com;X-NUM-GUESTS=0:mailto:p.pawlak@funandmobile.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE;CN=adambartkowiak2000@gmail.com;X-NUM-GUESTS=0:mailto:adambartkowiak2000@gmail.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=a.bartkowiak@funandmobile.com;X-NUM-GUESTS=0:mailto:a.bartkowiak@funandmobile.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=mail@supertowerdefence.com;X-NUM-GUESTS=0:mailto:mail@supertowerdefence.com
CREATED:20151029T090448Z
DESCRIPTION:OPIS EVENTU
LAST-MODIFIED:20151029T090613Z
LOCATION:Warsaw\\, Poland
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:TEST EVENTU Z GOOGLA
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR";



    $content = chunk_split(base64_encode($ical));

    // a random hash will be necessary to send mixed content
    $separator = md5(time());

    // carriage return type (we use a PHP end of line constant)
    $eol = PHP_EOL;



    // main header (multipart mandatory)
    $headers = "From: mail@supertowerdefence.pl" . $eol;
    $headers .= "MIME-Version: 1.0" . $eol;
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol . $eol;
    $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
    $headers .= "This is a MIME encoded message." . $eol . $eol;

    // message
    $headers .= "--" . $separator . $eol;
    $headers .= "Content-Type: text/plain; charset=\"iso-8859-1\"" . $eol;
    $headers .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $message = $first_name . " " . $last_name . " wrote the following:" . "\n\n" . $_POST['message'];
    $headers .= $message . $eol . $eol;

    // attachment
    $headers .= "--" . $separator . $eol;
    $headers .= "MIME-version: 1.0\r\n";
    $headers .= "Content-class: urn:content-classes:calendarmessage\r\n";
    $headers .= "Content-type: text/calendar; method=REQUEST; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: base64" . $eol;
    $headers .= "Content-Disposition: attachment" . $eol . $eol;
    $headers .= $content . $eol . $eol;
    $headers .= "--" . $separator . "--";

    $to = $_POST['email']; // this is your Email address
    $subject = "Form submission";

    mail($to,$subject,"",$headers);
    mail("mail@supertowerdefence.pl",$subject,"",$headers);
    //mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
}

?>

<!DOCTYPE html>
<head>
    <title>Form submission</title>
</head>
<body>

<form action="" method="post">
    First Name: <input type="text" name="first_name"><br>
    Last Name: <input type="text" name="last_name"><br>
    Email: <input type="text" name="email"><br>
    Message:<br><textarea rows="5" name="message" cols="30"></textarea><br>
    <input type="submit" name="submit" value="Submit">
</form>

</body>
</html>