<?php
// Path to the environment file (outside the web root)
$env_file_path = '/secret/.env';

// Check for the turnstile token in the POST data
if (!isset($_POST['cf-turnstile-response']) || empty($_POST['cf-turnstile-response'])) {
    header("Location: /login.php?error=missing_turnstile_response");
    exit;
}
$turnstile_response = $_POST['cf-turnstile-response'];

// Load the environment file securely
if (!file_exists($env_file_path)) {
    die("Error: environment file not found.");
}
$env = parse_ini_file($env_file_path);
if (!$env || !isset($env['TURNSTILE_SECRET_KEY'])) {
    die("Error: turnstile key missing from environment file.");
}
$turnstileSecretKey = $env['TURNSTILE_SECRET_KEY'];

// Build POST fields using URL encoding
$url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
$post_fields = http_build_query([
    'secret'   => $turnstileSecretKey,
    'response' => $turnstile_response
]);

// Set up and execute the cURL request
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
$response = curl_exec($ch);
curl_close($ch);

$response_data = json_decode($response);
if (!$response_data || $response_data->success !== true) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Captcha failed']);
    exit;
}

// If Turnstile validation succeeds, return success
echo json_encode(['success' => true]);
exit;
?>
