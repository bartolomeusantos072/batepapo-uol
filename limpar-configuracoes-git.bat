@echo off
echo =======================================
echo Limpando configuracoes Git locais...
echo =======================================

:: Remove nome e email configurados no repositório atual
git config --unset user.name
git config --unset user.email

:: Desativa qualquer cache de credenciais
git config --unset credential.helper

:: Apaga as credenciais armazenadas (se houver)
echo.
echo Apagando credenciais salvas (se houver)...
cmdkey /list | findstr github.com > nul
if %errorlevel%==0 (
    cmdkey /delete:git:https://github.com > nul
    echo Credenciais do GitHub removidas.
) else (
    echo Nenhuma credencial do GitHub encontrada.
)

echo.
echo ? Git limpo com sucesso.
echo =======================================
pause
