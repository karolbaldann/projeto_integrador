<?php

session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    
    $usuario_correto = "admin@teste.com";
    $senha_correta = "123456";

    if ($email == $usuario_correto && $senha == $senha_correta) {
        // Login Sucesso:
        $_SESSION['usuario_logado'] = true;
        
        
        header("Location: ../index.html?login=sucesso"); 
        exit;
    } else {
        
        echo "<script>
                alert('E-mail ou senha incorretos!');
                window.location.href='../index.html';
              </script>";
    }
}
?>