<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if(isset($_POST["mail"])&&$_POST["topic"]&&$_POST["message"]){
					$mail_value = $_POST["mail"];
					$topic_value = $_POST["topic"];
					$topic_length = strlen($topic_value);
					$message_value = $_POST["message"];
					$message_length = strlen($message_value);
					$validation_good = true;
					if(!filter_var($mail_value, FILTER_VALIDATE_EMAIL)){
						$validation_good = false;
						// echo "1";
					}

					if(!($topic_length>2 && $topic_length<100)){
						$validation_good = false;
						// echo "2";
					}

					if(!($message_length>5 && $message_length<2000)){
						$validation_good = false;
						// echo "3";
					}

					if($validation_good){
						echo "ok";
						$to = "kontakt@dawid-pachciarek.pl";
						$subject = "Nowy email od: ".$mail_value;
						$email_content = "<b>Temat: </b>".$topic_value."<br>"."<b>Email: </b>".$mail_value."<br><br>"."<b>Wiadomość: </b><br>".$message_value."<br>";
						$email_content = nl2br($email_content);
						
						// $email_headers = "Nowy email ze strony dawid-pachciarek.pl";
						$email_headers = 'MIME-Version: 1.0' . "\r\n";
						$email_headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
						$email_headers .= 'From: '.$to.''."\r\n";
						if(mail($to, $subject, $email_content, $email_headers)){
							http_response_code(200);
							echo "Wiadomość wysłana.";
						}else{
							http_response_code(500);
							echo "Coś poszło nie tak. Niestety nie możemy wysłać tej wiadomości";
						}
					}else{
						http_response_code(400);
						echo "Walidacja niepoprawna";
					}
				} else{
					http_response_code(400);
					echo "Walidacja niepoprawna";
				}
    } else {
        http_response_code(403);
        echo "Mamy problem z wysłaniem tej wiadomości spróbuj ponownie.";
    }

?>