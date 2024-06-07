<?php

// Cambia 'TU-CLAVE-SECRETA' por tu clave secreta
define('RECAPTCHA_V3_SECRET_KEY', getenv('RECAPTCHA_V3_SECRET_KEY'));

// Verifica si la petición es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos JSON de la petición
    $data = json_decode(file_get_contents('php://input'), true);

    // Ahora puedes acceder a los valores de esta manera
    $token = $data['token'];
    $data = array(
        'secret' => '6LcqYOcpAAAAAP4XScOuD3SVzxYFDtSlJureCwnT',
        'response' => $token
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    $arrResponse = json_decode($response, true);

    // verificar la respuesta
    if ($arrResponse['success'] && $arrResponse['score'] >= 0.5) {
        // Si entra aqui, es un humano, puedes procesar el formulario
        http_response_code(200);
        echo json_encode(array('res' => 'ok!, eres un humano', 'arrResponse' => $arrResponse));
    } else {
        // Si entra aqui, es un robot....
        http_response_code(403);
        echo json_encode(array('error' => 'Lo siento, parece que eres un Robot', 'arrResponse' => $arrResponse));
    }
} else {
    // Si la petición no es POST, servir el archivo HTML
    readfile('Contacto/Contacto_Analytiko_web.html');
}
?>
